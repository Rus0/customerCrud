<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;

class ReactController extends Controller
{
    public function getAllCustomers(){
      $customers = Customer::orderBy('id','DESC')->get();
      return response()->json(['customers'=>$customers]);
    }

    public function deleteCustomer(Request $request){
      $customer = Customer::find($request->id);
      $customer->delete();
      $customers = Customer::orderBy('id','DESC')->get();

      return response()->json(['customers'=>$customers]);
    }

    public function updateCustomerName(Request $request){
      $customer = Customer::find($request->id);
      $customer->name = $request->name;
      $customer->save();
      $customers = Customer::orderBy('id','DESC')->get();
      return response()->json(['customers'=>$customers]);

    }
    public function addNewCustomer(Request $request){
      $customer = new Customer;
      $customer->name = $request->name;
      $customer->lastnames = $request->lastnames;
      $customer->email = $request->email;
      $customer->phone = $request->phone;
      $customer->card = $request->card;
      $customer->save();
      $customers = Customer::orderBy('id','DESC')->get();
      return response()->json(['customers'=>$customers]);
    }
}
