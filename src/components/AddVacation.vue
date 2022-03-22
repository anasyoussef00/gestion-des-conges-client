<script lang="ts" setup>
import { reactive, ref, Ref } from 'vue'
import Swal from 'sweetalert2'

import Api from '@/api/Api'

const formData = reactive({
  nomJr: '',
  prenomJr: '',
  matriculeJr: '',
  periode: Date.now(),
  nbrejrs: 1
})

const errors: Ref<Record<string, unknown>> = ref({})
const errorMsg: Ref<string> = ref('')

const addVacation = async () => {
  try {
    await Api.post('/vacation/add', formData)
    Swal.fire({
      title: 'Nice!',
      text: 'Vacation has been added successfully.',
      icon: 'success'
    })
  } catch (err: any) {
    errorMsg.value = err.response.data.message
    errors.value = err.response.data.errors
    Swal.fire({
      toast: true,
      title: 'Oops!',
      text: err.response.data.message,
      icon: 'error',
      position: 'bottom'
    })
    console.error(err.response.data)
  }
}
</script>

<template>
	<form @submit.prevent="addVacation">
		<h1 class="text-center">Add vacation</h1>
		<section class="border border-dark p-4">
			<div class="form-group mb-2">
				<label for="nom">Nom</label>
				<input v-model="formData.nom" class="form-control" type="text" name="nom" placeholder="e.g. Doe" aria-describedby="nom" />
				<div v-for="(error, index) in errors.nom" :key="index" id="nom" class="form-text text-danger">{{error}}</div>
			</div>
			<div class="form-group mb-2">
				<label for="prenom">Prenom</label>
				<input v-model="formData.prenom" class="form-control"  type="text" name="prenom" placeholder="e.g. John" aria-describedby="prenom" />
				<div v-for="(error, index) in errors.prenom" :key="index" id="prenom" class="form-text text-danger">{{error}}</div>
			</div>
			<div class="form-group mb-2">
				<label for="matricule">Matricule</label>
				<input v-model="formData.matricule" class="form-control"  type="text" name="matricule" placeholder="e.g. AAAAAAA" aria-describedby="matricule" />
				<div v-for="(error, index) in errors.matricule" :key="index" id="matricule" class="form-text text-danger">{{error}}</div>
			</div>
			<div class="form-group mb-2">
				<label for="periode">Periode</label>
				<input v-model="formData.periode" class="form-control"  type="date" name="periode" aria-describedby="periode" />
				<div v-for="(error, index) in errors.periode" :key="index" id="periode" class="form-text text-danger">{{error}}</div>
			</div>
			<div class="form-group mb-3">
				<label for="nbreJrs">Nombre de jours restants</label>
				<input v-model="formData.nbrejrs" class="form-control" type="number" min="1" placeholder="1" aria-describedby="nbrejrs" />
				<div v-for="(error, index) in errors.nbrejrs" :key="index" id="nbrejrs" class="form-text text-danger">{{error}}</div>
			</div>
			<div class="d-flex justify-content-around align-items-center">
				<button class="btn btn-outline-primary" type="submit">Submit</button>
				<a class="text-success" href="#">Edit vacation</a>
				<a class="text-danger" href="#">Delete vacation</a>
			</div>
		</section>
	</form>
</template>

<style lang="scss">
section {
	box-shadow: 10px 10px;
}
</style>
