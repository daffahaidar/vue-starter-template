import { useMutation } from '@tanstack/vue-query' // / Importing useMutation dari Vue Query untuk melakukan mutasi data
import { api } from '@/libs/axios' // Importing instance axios yang telah dikonfigurasi
import { endpoint } from '@/api' // Importing endpoint yang berisi URL API untuk register
import type { AxiosError, AxiosResponse } from 'axios' // Importing tipe data AxiosError dan AxiosResponse dari axios untuk penanganan error dan response

// Definisikan tipe data untuk body request yang akan dikirim saat register
// Tipe ini akan digunakan untuk memastikan bahwa data yang dikirim sesuai dengan yang diharapkan
type RequestBody = {
  email: string // Email pengguna yang akan digunakan untuk register
  password: string // Password pengguna yang akan digunakan untuk register
  name: string // Nama pengguna yang akan digunakan untuk register
  role: string // Role pengguna yang akan digunakan untuk register
}

export const useRegister = ({
  onSuccess, // Callback yang akan dipanggil saat mutasi (Kirim data ke backend) berhasil
  onError, // Callback yang akan dipanggil saat mutasi gagal
}: {
  onSuccess?: (data: AxiosResponse) => void // Callback opsional yang menerima data response dari server saat kirim data berhasil
  onError?: (error: AxiosError) => void // Callback opsional yang menerima error dari server saat register gagal
}) => {
  return useMutation({
    mutationKey: ['register'], // Kunci unik untuk mutasi ini, digunakan oleh Vue Query untuk mengidentifikasi mutasi
    mutationFn: async (body: RequestBody) => {
      // Jika ingin menggunakan API yang telah didefinisikan, uncomment kode berikut:
      const response = await api.post(
        endpoint.register, // Menggunakan endpoint register yang telah didefinisikan
        body, // Mengirim data register ke endpoint register yang telah didefinisikan
      )
      return response // kembalikan response dari server setelah berhasil mengirim data
    },
    onSuccess,
    onError,
  })
}
