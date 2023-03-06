<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


/**
* @OA\Info(title="API changeorg", version="1.0")
*
* @OA\Server(url="http://swagger.local")
*/

class UserController extends Controller
{

    /**
    * @OA\Get(
    *     path="/api/register",
    *     summary="Registrar usuarios",
    *     @OA\Response(
    *         response=200,
    *         description="Registra un usuario"
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */
    public function register(Request $request)
        {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6',
                'c_password' => 'required|same:password',
            ]);
            if($validator->fails()){
                return response()->json($validator->messages(), 400);
            }
            $user = User::create([
                'name' => $request->get('name'),
                'email' => $request->get('email'),
                'password' => Hash::make($request->get('password')),
            ]);
            return response()->json(['message'=>'User Created','data'=>$user],200);
        }

        public function show(User $user){
            return response()->json(['message'=>'User Created satisfactoriamente','data'=>$user],200);
        }

    //mostrar usuarios
    public function user(){
        $users = User::all();
        return Auth::user();
    }


    public function peticionesFirmadas(Request $request){
        $id = Auth::id();
        $usuario = User::findOrFail($id);
        $peticiones = $usuario->firmas;
        return $peticiones;
        }


}
