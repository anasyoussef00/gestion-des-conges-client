<script lang="ts" setup>
import { reactive, ref, Ref } from 'vue'
import Swal from 'sweetalert2'

import Api from '@/api/Api'

const formData = reactive({
  member_id: ''
})

// const memberID = ref('');

// const errors: Ref<Record<string, unknown>> = ref({})
// const errorMsg: Ref<string> = ref('')

const deleteVacation = async () => {
  try {
    await Api.post('/vacation/delete', formData)
    Swal.fire({
      title: 'Nice!',
      text: 'Vacation has been updated successfully.',
      icon: 'success'
    })
  } catch (err: any) {
  	// console.error(err)
    // errorMsg.value = err.response.data.message
    // errors.value = err.response.data.errors
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
	<form @submit.prevent="deleteVacation">
		<h1 class="text-center">Edit vacation</h1>
		<section class="border border-dark p-4">
			<div class="form-group mb-2">
				<label for="member-id">Member id</label>
				<input v-model="formData.member_id" class="form-control" type="text" name="member-id" placeholder="e.g. 1" aria-describedby="member-id" />
				<!-- <div v-for="(error, index) in errors.nom" :key="index" id="member-id" class="form-text text-danger">{{error}}</div> -->
			</div>
			<div class="d-flex justify-content-around align-items-center">
				<button class="btn btn-outline-danger" type="submit">Delete</button>
				<a class="text-primary" href="/add-vacation">Add vacation</a>
				<a class="text-success" href="/edit-vacation">Edit vacation</a>
			</div>
		</section>
	</form>
</template>

<style lang="scss">
section {
	box-shadow: 10px 10px;
}
</style>
