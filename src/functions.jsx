import Swal from 'sweetalert2'
import storage from './storage/storage.jsx'
import axios from 'axios'

export const showAlert = (msg, icon) => {
  Swal.fire({
    title: msg,
    icon: icon,
    buttonsStyling: true
  })
}

export const sendRequest = async(method, params, url, redir='', token=true, isFormData=false) => {
  if (token) {
    const authToken = storage.get('authToken')
    axios.defaults.headers.common['Authorization'] = `${authToken}`
  }
  if (isFormData) {
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
  }
  let res
  await axios({ method: method, url: url, data: params }).then(
    response => {
      if (response?.data) {
        res = response.data;
        if (method !== 'GET') showAlert(response.data.message, 'success');
        setTimeout(() => {
          if (redir !== '') {
              window.location.href = redir
          }
        }, 200)
      }
    }
  ).catch((errors) => {
    let desc = '';
    res = errors.data
    if (errors.response?.data?.errors) {
      errors.response.data.errors.map((e) => {
        desc = `${desc} ${e}`;
      });
    } else if (errors.response?.data?.error) {
      desc = errors.response.data.error;
    } else {
      desc = "Error desconocido";
    }
    showAlert(desc, 'error');
  })
  
  return res
}

export const confirmation = async (name, url, redir) => {
  const alert = Swal.mixin({buttonsStyling:true})
  alert.fire({
    title: `Estas seguro de eliminar ${name}`,
    icon: 'question', showCancelButton: true, 
    confirmButtonText: '<i className="fa-solid fa-check"/>Sí, eliminar',
    cancelButtonText: '<i className="fa-solid fa-ban"/>Cancelar'
  }).then((result) => {
    if(result.isConfirmed){
      sendRequest('DELETE', {}, url, redir)
    }
  })
}

export default showAlert
