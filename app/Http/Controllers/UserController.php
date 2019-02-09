<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Repositories\UserRepository;

class UserController extends Controller
{
    protected $userRepository;
    protected $nbrperPage = 7;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = $this->userRepository->getPaginate($this->nbrperPage, 'created_at', 'desc');

        return $this->userRepository->collectionToJson($users);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);

        $name = $request->input('name');
        $email = $request->input('email');
        $password = $request->input('password');

        $inputs = [
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
        ];

        $user = $this->userRepository->store($inputs);

        if($user)
        {
            return $this->userRepository->objectToJson($this->userRepository->getById($user->id));
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email,'.$id],
            'password' => ['sometimes', 'nullable', 'string', 'min:6', 'confirmed'],
        ]);

        $name = $request->input('name');
        $email = $request->input('email');
        $password = $request->input('password') ? Hash::make($request->input('password')) : $this->userRepository->getById($id)->password;

        $inputs = [
            'name' => $name,
            'email' => $email,
            'password' => $password,
        ];

        $user = $this->userRepository->update($id, $inputs);

        if($user)
        {
            return $this->userRepository->objectToJson($this->userRepository->getById($user->id));
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = $this->userRepository->getById($id);


        if($this->userRepository->destroy($id))
        {
            return $this->userRepository->objectToJson($user);
        }
    }
}
