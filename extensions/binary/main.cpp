#define BUILDING_NODE_EXTENSION
#include <v8.h>
#include <node.h>
#include <node_buffer.h>
#include <algorithm>

using namespace node;
using namespace v8;

void ExternalArrayWeakCallback(Persistent<Value> object, void* data) {
  delete[] reinterpret_cast<int *>(data);
  object.Dispose();
}

Handle<Value> ArrayBuffer_do_test(const Arguments& args) {
  int* data = reinterpret_cast<int *>(args.This()->GetPointerFromInternalField(0));
  for(size_t i = 0; i != 8192; ++i){
    data[i] = i;
  }
  for(size_t j = 0; j != 2500; ++j){
    for(size_t i = 0; i != 8192; ++i){
      data[8191 ^ i] = data[i];
    }
  }
	return Undefined();
}

Handle<Value> ArrayBuffer(const Arguments& args) {
  if (args.Length() != 1 || !args[0]->IsNumber()) {
    return ThrowException(String::New("Invalid ArrayBuffer arguments."));
  }

  size_t length = args[0]->Uint32Value();
  void* data = new int[length];

  Persistent<Object> persistentHandle = Persistent<Object>::New(args.This());
  persistentHandle.MakeWeak(data, ExternalArrayWeakCallback);

  args.This()->SetPointerInInternalField(0, data);
  args.This()->SetPointerInInternalField(1, reinterpret_cast<void*>(length));
  args.This()->Set(String::New("length"), Int32::New(length), ReadOnly);
  args.This()->SetIndexedPropertiesToExternalArrayData(data, kExternalIntArray, length);

  Persistent<Function> ArrayBuffer_do_test_function = Persistent<Function>::New(FunctionTemplate::New(ArrayBuffer_do_test)->GetFunction());
  args.This()->Set(String::NewSymbol("do_test"), ArrayBuffer_do_test_function);

  return args.This();
}

Handle<Value> GetIntArrayItem(uint32_t index, const AccessorInfo &info) {
  Local<Object> self = info.Holder();
  return Number::New(reinterpret_cast<int *>(self->GetPointerFromInternalField(0))[index]);
}

Handle<Value> SetIntArrayItem(uint32_t index, Local<Value> value, const AccessorInfo& info) {
  Local<Object> self = info.Holder();
  reinterpret_cast<int *>(self->GetPointerFromInternalField(0))[index] = value->Int32Value();
	return Undefined();
}

Handle<Value> InterceptorArray(const Arguments& args) {
  if (args.Length() != 1 || !args[0]->IsNumber()) {
    return ThrowException(String::New("Invalid InterceptorArray arguments."));
  }

  size_t length = args[0]->Uint32Value();
  void* data = new int[length];

  Persistent<Object> persistentHandle = Persistent<Object>::New(args.This());
  persistentHandle.MakeWeak(data, ExternalArrayWeakCallback);

  args.This()->SetPointerInInternalField(0, data);
  args.This()->SetPointerInInternalField(1, reinterpret_cast<void*>(length));
  args.This()->Set(String::New("length"), Int32::New(length), ReadOnly);

  return args.This();
}

struct SimpleObjectData {
  int a;
  int b;
  int c;
};

void ExternalSimpleObjectWeakCallback(Persistent<Value> object, void* data) {
  delete reinterpret_cast<SimpleObjectData *>(data);
  object.Dispose();
}

Handle<Value> GetA(Local<String> property, const AccessorInfo &info) {
  Local<Object> self = info.Holder();
  Local<External> wrap = Local<External>::Cast(self->GetInternalField(0));
  void* ptr = wrap->Value();
  int value = static_cast<SimpleObjectData*>(ptr)->a;
  return Integer::New(value);
}

void SetA(Local<String> property, Local<Value> value, const AccessorInfo& info) {
  Local<Object> self = info.Holder();
  Local<External> wrap = Local<External>::Cast(self->GetInternalField(0));
  void* ptr = wrap->Value();
  static_cast<SimpleObjectData*>(ptr)->a = value->Int32Value();
}

Handle<Value> GetB(Local<String> property, const AccessorInfo &info) {
  Local<Object> self = info.Holder();
  Local<External> wrap = Local<External>::Cast(self->GetInternalField(0));
  void* ptr = wrap->Value();
  int value = static_cast<SimpleObjectData*>(ptr)->b;
  return Integer::New(value);
}

void SetB(Local<String> property, Local<Value> value, const AccessorInfo& info) {
  Local<Object> self = info.Holder();
  Local<External> wrap = Local<External>::Cast(self->GetInternalField(0));
  void* ptr = wrap->Value();
  static_cast<SimpleObjectData*>(ptr)->b = value->Int32Value();
}

Handle<Value> GetC(Local<String> property, const AccessorInfo &info) {
  Local<Object> self = info.Holder();
  Local<External> wrap = Local<External>::Cast(self->GetInternalField(0));
  void* ptr = wrap->Value();
  int value = static_cast<SimpleObjectData*>(ptr)->c;
  return Integer::New(value);
}

void SetC(Local<String> property, Local<Value> value, const AccessorInfo& info) {
  Local<Object> self = info.Holder();
  Local<External> wrap = Local<External>::Cast(self->GetInternalField(0));
  void* ptr = wrap->Value();
  static_cast<SimpleObjectData*>(ptr)->c = value->Int32Value();
}

Handle<Value> SimpleObject(const Arguments& args) {
  void* data = new SimpleObjectData;

  Persistent<Object> persistentHandle = Persistent<Object>::New(args.This());
  persistentHandle.MakeWeak(data, ExternalSimpleObjectWeakCallback);

  args.This()->SetPointerInInternalField(0, data);
  args.This()->SetAccessor(String::New("a"), GetA, SetA);
  args.This()->SetAccessor(String::New("b"), GetB, SetB);
  args.This()->SetAccessor(String::New("c"), GetC, SetC);

  return args.This();
}

Handle<Value> GetSimpleObjectItem(Local<String> property, const AccessorInfo &info) {
  Local<Object> self = info.Holder();
  Local<External> wrap = Local<External>::Cast(self->GetInternalField(0));
  int* ptr = reinterpret_cast<int*>(wrap->Value());
  char c = (*(String::AsciiValue(property)))[0];
  return Number::New(ptr[c-'a']);
}

Handle<Value> SetSimpleObjectItem(Local<String> property, Local<Value> value, const AccessorInfo& info) {
  Local<Object> self = info.Holder();
  Local<External> wrap = Local<External>::Cast(self->GetInternalField(0));
  int* ptr = reinterpret_cast<int*>(wrap->Value());
  char c = (*(String::AsciiValue(property)))[0];
  ptr[c-'a'] = value->Int32Value();
	return Undefined();
}

Handle<Value> SimpleObjectInterceptor(const Arguments& args) {
  void* data = new int[3];

  Persistent<Object> persistentHandle = Persistent<Object>::New(args.This());
  persistentHandle.MakeWeak(data, ExternalArrayWeakCallback);

  args.This()->SetPointerInInternalField(0, data);

  return args.This();
}

Persistent<FunctionTemplate> array_buffer_constructor_template;
Persistent<FunctionTemplate> interceptor_array_buffer_template;
Persistent<FunctionTemplate> simple_object_template;
Persistent<FunctionTemplate> interceptor_simple_object_template;
void init_all(Handle<Object> target) {
  // SetIndexedPropertyHandler
  {
    interceptor_array_buffer_template = Persistent<FunctionTemplate>::New(FunctionTemplate::New(InterceptorArray));
    interceptor_array_buffer_template->SetClassName(String::New("InterceptorArray"));
    interceptor_array_buffer_template->InstanceTemplate()->SetInternalFieldCount(2);
    interceptor_array_buffer_template->InstanceTemplate()->SetIndexedPropertyHandler(GetIntArrayItem, SetIntArrayItem);
    target->Set(String::NewSymbol("InterceptorArray"), interceptor_array_buffer_template->GetFunction());
  }

  // SetIndexedPropertiesToExternalArrayData
  {
    array_buffer_constructor_template = Persistent<FunctionTemplate>::New(FunctionTemplate::New(ArrayBuffer));
    array_buffer_constructor_template->SetClassName(String::New("ArrayBuffer"));
    array_buffer_constructor_template->InstanceTemplate()->SetInternalFieldCount(2);
    target->Set(String::NewSymbol("ArrayBuffer"), array_buffer_constructor_template->GetFunction());
  }

  // Simple object with integer a,b,c properties
  {
    simple_object_template = Persistent<FunctionTemplate>::New(FunctionTemplate::New(SimpleObject));
    simple_object_template->SetClassName(String::New("SimpleObject"));
    simple_object_template->InstanceTemplate()->SetInternalFieldCount(1);
    target->Set(String::NewSymbol("SimpleObject"), simple_object_template->GetFunction());
  }

  // Simple object with integer a,b,c properties (using property interceptor)
  {
    interceptor_simple_object_template = Persistent<FunctionTemplate>::New(FunctionTemplate::New(SimpleObjectInterceptor));
    interceptor_simple_object_template->SetClassName(String::New("SimpleObjectInterceptor"));
    interceptor_simple_object_template->InstanceTemplate()->SetInternalFieldCount(1);
    interceptor_array_buffer_template->InstanceTemplate()->SetNamedPropertyHandler(GetSimpleObjectItem, SetSimpleObjectItem);
    target->Set(String::NewSymbol("SimpleObjectInterceptor"), interceptor_simple_object_template->GetFunction());
  }
}

NODE_MODULE(binary, init_all)
