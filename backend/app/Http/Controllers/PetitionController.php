<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Petition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\File;


class PetitionController extends Controller{

    //metodo __construct
    public function __construct(){
        $this->middleware('auth:api', ['except' => ['index', 'show', 'list' ]]);
    }

   /**
    * @OA\Post(
    *     path="/api/store",
    *     summary="Guardar una peticion",
    *     @OA\Response(
    *         response=200,
    *         description="Guardar una peticiones"
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */
    public function store(Request $request){
     /*  $validator = Validator::make($request->all(),
            [
                'title' => 'required|max:255',
                'description' => 'required',
                'destinatario' => 'required'
                'category_id'=>'required',
            ]
        );*/


    /*    if($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }*/

     /*   $validator = Validator::make($request->all(),
            [
                'image' => 'required|mimes:png,jpg|max:4096',
            ]);*/
/*
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }*/

        $input = $request->all();
        if ($file = $request->file('file')) {
            $name = $file->getClientOriginalName();
            $file->move('peticionesimgs/', $name);
            $input['file'] = $name;
        }

        $categoria = Category::findOrFail($input['category_id']);
        $user = Auth::user(); //asociarlo al usuario authenticado
        $peticion = new Petition($input);
        $peticion->user()->associate($user);
        $peticion->category()->associate($categoria);
        $peticion->firmantes = 0;
        $peticion->estado = 'pendiente';
        $peticion->image = 'public/peticionesimgs/' . $input['file'];
        $peticion->save();


        return $peticion;
    }



    /**
    * @OA\Get(
    *     path="/api/petitions",
    *     summary="Mostra todas las peticiones",
    *     @OA\Response(
    *         response=200,
    *         description="Mostrar todas las peticiones"
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */
        //todas las peticiones
        public function index(Request $request){
            $peticiones = Petition::all();
            return $peticiones;
        }

        //mostrar por id
        public function show(Request $request, $id){
            $peticion = Petition::findOrFail($id);
            return $peticion;
        }


              /**
    * @OA\Get(
    *     path="/api/mispeticiones",
    *     summary="Mostra todas las peticiones",
    *     @OA\Response(
    *         response=200,
    *         description="Mostrar todas las peticiones"
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */
        //listar tu peticion
        public function listMine(Request $request){
        //parent::index();
        $user = Auth::user();
        $id = Auth::user()->id;;
        $peticiones = Petition::where('user_id', $id)->get()->toArray();
       /* return $peticiones;*/
        return response()->json($peticiones, 200);
        return response()->json($peticiones, 200);

        }


    /**
    * @OA\delete(
    *     path="/api/petition/{id}",
    *     summary="Eliminar una peticion",
    *     @OA\Response(
    *         response=200,
    *         description="Elimina una peticion"
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */
    //Eliminar peticion
        public function destroy(Request $request, $id){
        $peticion = Petition::findOrFail($id);
        $peticion->delete();
        return $peticion;
    }

//        UPDATE
        public function update(Request $request, $id){
        $peticion = Petition::findOrFail($id);
        $peticion->update($request->all());
        $peticion->save();
        return response()->json(['message' => 'Esta es la peticion modificada', 'data' => $peticion], 200);
    }

//    GET
    public function getById($id){
        $peticion = Petition::findOrFail($id);
        return response()->json($peticion, 200);
    }




     /**
    * @OA\get(
    *     path="/api/peticiones/cambiarEstado/{id}",
    *     summary="Cambiar el estado de una peticion",
    *     @OA\Response(
    *         response=200,
    *         description="Cambia el estado de una peticion"
    *     ),
    *     @OA\Response(
    *         response="default",
    *         description="Ha ocurrido un error."
    *     )
    * )
    */
        public function cambiarEstado(Request $request, $id){
            $peticion = Petition::findOrFail($id);
            $peticion->estado = 'aceptada';
            $peticion->save();
            return response()->json(['message' => 'Esta es la peticion que haz cambiado de de estado', 'data' => $peticion], 200);
        }


        //fimar Peticion
        public function firmar(Request $request, $id){

        try {
        $peticion = Petition::findOrFail($id);
        $user = Auth::user();
        $firmas = $peticion->firmas;
            foreach ($firmas as $firma) {

            if ($firma->id == $user->id) {
            return response()->json(['message' => 'Ya has firmado esta petición'], 403);
            }
        }

            $user_id = [$user->id];
            $peticion->firmas()->attach($user_id);
            $peticion->firmantes = $peticion->firmantes + 1;
            $peticion->save();

            } catch (\Throwable$th) {
            return response()->json(['message' => 'La petición no se ha podido firmar'], 500);
            }

            return response()->json(['message' => 'Peticion firmada satisfactioriamente', 'peticion' => $peticion], 201);
        }


        //pagination
        function list(Request $request) {
            $peticiones = Petition::jsonPaginate();
            return $peticiones;
        }









}
