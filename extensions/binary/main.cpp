#define BUILDING_NODE_EXTENSION
#include <v8.h>
#include <node.h>
#include <node_buffer.h>
#include <algorithm>

using namespace node;
using namespace v8;

// alter_id_set(ids_to_add, ids_to_remove, buffer, success, failure)

/*

  var ids = buffer.to_int4_array();
  ids = underscore.difference(ids, ids_to_remove);
  ids = underscore.union(ids, ids_to_add);
  ids.sort(function(a,b){return a-b;});
  success(Buffer.from_int4_array(ids));

*/

// NOTE: remove happens before add
/*
size_t merge_in_changes(unsigned int *ids_target, size_t num_existing_ids, const unsigned int *existing_ids, size_t num_ids_to_add, const unsigned int *ids_to_add, size_t num_ids_to_remove, const unsigned int *ids_to_remove){
  if(num_existing_ids == 0){
    if(num_ids_to_add == 0) return 0;
    else {
      // NOTE: remove happens before add, so we only need the added ids. The removal list has no effect
      // pass through ids_to_add
      ::std::copy(ids_to_add, ids_to_add + num_ids_to_add, ids_target);
      return num_ids_to_add;
    }
  }
  else if(num_ids_to_add == 0){
    if(num_ids_to_remove == 0){
      // pass through existing_ids
      ::std::copy(existing_ids, existing_ids + num_existing_ids, ids_target);
      return num_existing_ids;
    }
    else {
      if(num_ids_to_remove == 1){
        // remove a single id
        ::std::pair<const unsigned int *, const unsigned int *> equal_begin_and_end = ::std::equal_range(existing_ids, existing_ids + num_existing_ids, ids_to_remove[0]);
        return (::std::copy(equal_begin_and_end.second, existing_ids + num_existing_ids, ::std::copy(existing_ids, equal_begin_and_end.first, ids_target)) - ids_target);
      }
      else {
        // simple remove
        return (::std::set_difference(existing_ids, existing_ids + num_existing_ids, ids_to_remove, ids_to_remove + num_ids_to_remove, ids_target) - ids_target);
      }
    }
  }
  else if(num_ids_to_remove == 0){
    if(num_ids_to_add == 1){
      // add a single id
      ::std::pair<const unsigned int *, const unsigned int *> equal_begin_and_end = ::std::equal_range(existing_ids, existing_ids + num_existing_ids, ids_to_add[0]);
      unsigned int *insert_point = ::std::copy(existing_ids, equal_begin_and_end.first, ids_target);
      *insert_point = ids_to_add[0];
      return (::std::copy(equal_begin_and_end.second, existing_ids + num_existing_ids, insert_point + 1) - ids_target);
    }
    else {
      // simple merge
      return (::std::set_union(existing_ids, existing_ids + num_existing_ids, ids_to_add, ids_to_add + num_ids_to_add, ids_target) - ids_target);
    }
  }
  else {
    // TODO: merge & remove
    return 0;
  }
}

Handle<Value> alter_id_set(const Arguments& args) {
  HandleScope scope;
  Local<Object> global_obj = Context::GetCurrent()->Global();
  
  // ids_to_add
  Local<Array> js_ids_to_add = Local<Array>::Cast(args[0]);
  const size_t num_ids_to_add = js_ids_to_add->Length();
  unsigned int ids_to_add[num_ids_to_add];
  for (size_t i = 0; i != num_ids_to_add; ++i) {
    ids_to_add[i] = js_ids_to_add->Get(i)->IntegerValue();  
  }
  ::std::sort(ids_to_add, ids_to_add + num_ids_to_add);

  // ids_to_remove
  Local<Array> js_ids_to_remove = Local<Array>::Cast(args[1]);
  const size_t num_ids_to_remove = js_ids_to_remove->Length();
  unsigned int ids_to_remove[num_ids_to_remove];
  for (size_t i = 0; i != num_ids_to_remove; ++i) {
    ids_to_remove[i] = js_ids_to_remove->Get(i)->IntegerValue();  
  }
  ::std::sort(ids_to_remove, ids_to_remove + num_ids_to_remove);
  
  // get the ids
  Local<Object> buffer = Local<Object>::Cast(args[2]);
  const size_t num_existing_ids = Buffer::Length(buffer);
  const unsigned int *existing_ids = reinterpret_cast<const unsigned int *>(Buffer::Data(buffer));

  // new buffer
  const size_t max_size = num_existing_ids + num_ids_to_add;
  Buffer* new_buffer = Buffer::New(4 * max_size);
  Local<Object> js_slow_buffer = Local<Object>::New(new_buffer->handle_);
  unsigned int *ids_target = reinterpret_cast<unsigned int *>(Buffer::Data(new_buffer));
  
  // write to the new buffer
  const size_t num_items = merge_in_changes(ids_target, num_existing_ids, existing_ids, num_ids_to_add, ids_to_add, num_ids_to_remove, ids_to_remove);
  
  // create a Buffer from the SlowBuffer
  // TODO: save this information for next time
  Local<Function> buffer_constructor = Local<Function>::Cast(global_obj->Get(String::New("Buffer")));
  Handle<Value> buffer_constructor_args[3] = { new_buffer->handle_, Integer::New(num_items * 4), Integer::New(0) };
  Local<Object> js_buffer = buffer_constructor->NewInstance(3, buffer_constructor_args);

  Local<Function> success_callback = Local<Function>::Cast(args[3]);
  const unsigned argc = 1;
  Local<Value> argv[argc] = { js_buffer };
  success_callback->Call(Context::GetCurrent()->Global(), argc, argv);
  
  return scope.Close(Undefined());
}

struct leaderboard_index_entry {
  unsigned int rating;
  unsigned int id;
};

bool operator<(const leaderboard_index_entry &a, const leaderboard_index_entry &b) {
  if(a.rating < b.rating) return true;
  if(a.rating > b.rating) return false;
  return a.id < b.id;
}

Handle<Value> sort_leaderboard_index(const Arguments& args) {
  HandleScope scope;
  Local<Object> buffer = Local<Object>::Cast(args[0]);
  const size_t num_entries = Buffer::Length(buffer) >> 3;
  leaderboard_index_entry *data = reinterpret_cast<leaderboard_index_entry *>(Buffer::Data(buffer));

  ::std::sort(data, data + num_entries);
  return scope.Close(Undefined());
}
*/

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

Handle<Value> GetIntArrayItem(uint32_t index, const AccessorInfo &info) {
  Local<Object> self = info.Holder();
  return Number::New(reinterpret_cast<int *>(self->GetPointerFromInternalField(0))[index]);
}

Handle<Value> SetIntArrayItem(uint32_t index, Local<Value> value, const AccessorInfo& info) {
  Local<Object> self = info.Holder();
  reinterpret_cast<int *>(self->GetPointerFromInternalField(0))[index] = value->Int32Value();
	return Undefined();
}

Persistent<FunctionTemplate> array_buffer_constructor_template;
Persistent<FunctionTemplate> interceptor_array_buffer_template;
void init_all(Handle<Object> target) {
  // SetIndexedPropertyHandler
  {
    interceptor_array_buffer_template = Persistent<FunctionTemplate>::New(FunctionTemplate::New(InterceptorArray));
    interceptor_array_buffer_template->SetClassName(String::New("InterceptorArray"));
    interceptor_array_buffer_template->InstanceTemplate()->SetInternalFieldCount(2);
    interceptor_array_buffer_template->InstanceTemplate()->SetIndexedPropertyHandler(GetIntArrayItem, SetIntArrayItem);
    target->Set(String::NewSymbol("InterceptorArray"), interceptor_array_buffer_template->GetFunction());

//    Handle<ObjectTemplate> interceptor_array_buffer_template = ObjectTemplate::New();
//    interceptor_array_buffer_template->SetIndexedPropertyHandler(
//      GetIntArrayItem,
//      SetIntArrayItem //,
//      IndexedPropertyQueryCallback query=0,
//      IndexedPropertyDeleterCallback deleter=0,
//      IndexedPropertyEnumeratorCallback enumerator=0,
//      Handle< Value > data=Handle< Value >()
//    );
  }

  // SetIndexedPropertiesToExternalArrayData
  {
    array_buffer_constructor_template = Persistent<FunctionTemplate>::New(FunctionTemplate::New(ArrayBuffer));
    interceptor_array_buffer_template->SetClassName(String::New("ArrayBuffer"));
    array_buffer_constructor_template->InstanceTemplate()->SetInternalFieldCount(2);
    target->Set(String::NewSymbol("ArrayBuffer"), array_buffer_constructor_template->GetFunction());
  }

/*
  Persistent<Function> alter_id_set_handle = Persistent<Function>::New(FunctionTemplate::New(alter_id_set)->GetFunction());
  Persistent<Function> sort_leaderboard_index_handle = Persistent<Function>::New(FunctionTemplate::New(sort_leaderboard_index)->GetFunction());
  target->Set(String::NewSymbol("alter_id_set"), alter_id_set_handle);
  target->Set(String::NewSymbol("sort_leaderboard_index"), sort_leaderboard_index_handle);
*/
}

NODE_MODULE(binary, init_all)
