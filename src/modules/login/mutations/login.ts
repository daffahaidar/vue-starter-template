import { useMutation } from '@tanstack/vue-query' // / Importing useMutation dari Vue Query untuk melakukan mutasi data
import { api } from '@/libs/axios' // Importing instance axios yang telah dikonfigurasi
import { endpoint } from '@/api' // Importing endpoint yang berisi URL API untuk login
import type { AxiosError, AxiosResponse } from 'axios' // Importing tipe data AxiosError dan AxiosResponse dari axios untuk penanganan error dan response

// Definisikan tipe data untuk body request yang akan dikirim saat login
// Tipe ini akan digunakan untuk memastikan bahwa data yang dikirim sesuai dengan yang diharapkan
type RequestBody = {
  email: string // Email pengguna yang akan digunakan untuk login
  password: string // Password pengguna yang akan digunakan untuk login
}

export const useLogin = ({
  onSuccess, // Callback yang akan dipanggil saat mutasi (Kirim data ke backend) berhasil
  onError, // Callback yang akan dipanggil saat mutasi gagal
}: {
  onSuccess?: (data: AxiosResponse) => void // Callback opsional yang menerima data response dari server saat kirim data berhasil
  onError?: (error: AxiosError) => void // Callback opsional yang menerima error dari server saat login gagal
}) => {
  return useMutation({
    mutationKey: ['login'], // Kunci unik untuk mutasi ini, digunakan oleh Vue Query untuk mengidentifikasi mutasi
    mutationFn: async (body: RequestBody) => {
      // Jika ingin menggunakan API yang telah didefinisikan, uncomment kode berikut:
      const response = await api.post(
        endpoint.login, // Menggunakan endpoint login yang telah didefinisikan
        body, // Mengirim data login ke endpoint login yang telah didefinisikan
      )
      return response // kembalikan response dari server setelah berhasil mengirim data
    },
    onSuccess,
    onError,
  })
}
