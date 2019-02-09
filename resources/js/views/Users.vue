<template>
    <div class="row">

        <div class="col">
          <div class="card shadow">
            <div class="card-header border-0">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">Users</h3>
                </div>
                <div class="col text-right">
                  <a href="#!" class="btn btn-sm btn-primary" @click="create"><!-- data-toggle="modal" data-target="#modal-form" --><i class="fas fa-plus"></i></a>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">User</th>
                    <th scope="col">Mail</th>
                    <th scope="col">Type</th>
                    <th scope="col">Users</th>
                    <th scope="col">Completion</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>

                  <tr v-for="(user, index) in users" v-bind:key="user.id">
                    <th scope="row">
                      <div class="media align-items-center">
                        <a href="#" class="avatar rounded-circle mr-3">
                          <img alt="Image placeholder" src="https://placeimg.com/400/400/any">
                        </a>
                        <div class="media-body">
                          <span class="mb-0 text-sm">{{ user.name }}</span>
                        </div>
                      </div>
                    </th>
                    <td>
                      {{ user.email }}
                    </td>
                    <td>
                      <span class="badge badge-dot mr-4">
                        <i class="bg-warning"></i> {{ user.type }}
                      </span>
                    </td>
                    <td>
                      <div class="avatar-group">
                        <a href="#" class="avatar avatar-sm" data-toggle="tooltip" data-original-title="Ryan Tompson">
                          <img alt="Image placeholder" src="https://placeimg.com/400/400/any" class="rounded-circle">
                        </a>
                        <a href="#" class="avatar avatar-sm" data-toggle="tooltip" data-original-title="Romina Hadid">
                          <img alt="Image placeholder" src="https://placeimg.com/400/400/any" class="rounded-circle">
                        </a>
                        <a href="#" class="avatar avatar-sm" data-toggle="tooltip" data-original-title="Alexander Smith">
                          <img alt="Image placeholder" src="https://placeimg.com/400/400/any" class="rounded-circle">
                        </a>
                        <a href="#" class="avatar avatar-sm" data-toggle="tooltip" data-original-title="Jessica Doe">
                          <img alt="Image placeholder" src="https://placeimg.com/400/400/any" class="rounded-circle">
                        </a>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex align-items-center">
                        <span class="mr-2">60%</span>
                        <div>
                          <div class="progress">
                            <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;"></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="text-right">
                      <div class="dropdown">
                        <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i class="fas fa-ellipsis-v"></i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                          <a class="dropdown-item" href="#" @click="edit(user, index)">Edit</a>
                          <a class="dropdown-item" href="#" @click="destroy(user.id, index)">Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
            <div class="card-footer py-4">
              <nav aria-label="...">
                <ul class="pagination justify-content-end mb-0">
                  <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1">
                      <i class="fas fa-angle-left"></i>
                      <span class="sr-only">Previous</span>
                    </a>
                  </li>
                  <li class="page-item active">
                    <a class="page-link" href="#">1</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
                  </li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      <i class="fas fa-angle-right"></i>
                      <span class="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        

  <div class="modal fade" id="modal-form" tabindex="-1" role="dialog" aria-labelledby="modal-form" aria-hidden="true">
    <div class="modal-dialog modal- modal-dialog-centered modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-body p-0">

          <div class="card bg-secondary shadow border-0">

            <div class="card-body px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <span>Sign Up</span>
              </div>
              <form role="form" @submit.prevent @keyup.enter="isEdit ? update() : store()" @keydown="user.errors.clear($event.target.name)">
                <div class="form-group">
                  <div class="input-group input-group-alternative mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="ni ni-hat-3"></i></span>
                    </div>
                    <input class="form-control" placeholder="Name" type="text" name="name" v-model="user.name">
                  </div>
                  <span class="invalid-feedback" style="display: block;" role="alert" v-if="user.errors.has('name')" v-text="user.errors.get('name')">
                    <!-- <strong>{{ user.errors.get('name') }}</strong> -->
                  </span>
                </div>
                <div class="form-group">
                  <div class="input-group input-group-alternative mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="ni ni-email-83"></i></span>
                    </div>
                    <input class="form-control" placeholder="Email" type="email" name="email" v-model="user.email">
                  </div>
                  <span class="invalid-feedback" style="display: block;" role="alert" v-if="user.errors.has('email')" v-text="user.errors.get('email')">
                    <!-- <strong>{{ user.errors.get('email') }}</strong> -->
                  </span>
                </div>
                <div class="form-group">
                  <div class="input-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                    </div>
                    <input class="form-control" placeholder="Password" type="password" name="password" v-model="user.password">
                  </div>
                  <span class="invalid-feedback" style="display: block;" role="alert" v-if="user.errors.has('password')" v-text="user.errors.get('password')">
                    <!-- <strong>{{ user.errors.get('password') }}</strong> -->
                  </span>
                </div>
                <div class="form-group">
                  <div class="input-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="ni ni-lock-circle-open"></i></span>
                    </div>
                    <input class="form-control" placeholder="Confirm Password" type="password" name="password_confirmation" v-model="user.password_confirmation">
                  </div>
                  <span class="invalid-feedback" style="display: block;" role="alert" v-if="user.errors.has('password_confirmation')" v-text="user.errors.get('password_confirmation')">
                    <!-- <strong>{{ user.errors.get('password_confirmation') }}</strong> -->
                  </span>
                </div>
                <div class="text-center">
                  <button type="button" class="btn btn-primary mt-4" @click="isEdit ? update() : store()">Save</button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>


      </div>
</template>

<script>
    export default {

      created(){
        this.index();
      },

      computed: {
          ...mapGetters({
              users: 'users/data',
              user: 'users/form',
              user_index: 'users/current_index',
              api_url: 'users/api_url',
              isEdit: 'users/isEdit',
          }),
      },

      methods: {
          index(){
            this.$store.dispatch('users/_get');
          },
          create()
          {
            this.$store.commit('users/resetEdit');
            $('#modal-form').modal('show');
          },
          store(){
            this.$store.dispatch('users/_store')
                .then(response => {
                  $('#modal-form').modal('hide');
                });
          },
          edit(element, index)
          {
            this.$store.commit('users/edit', {element: element, index: index});
            $('#modal-form').modal('show');
          },
          update(){
            this.$store.dispatch('users/_update')
                .then(response => {
                  $('#modal-form').modal('hide');
                });;
          },
          destroy(id, index){
            this.$store.dispatch('users/_destroy', {id: id, index: index});
          },

        }
    }
</script>
