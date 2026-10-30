# Zoos ART

Website katalog barang antik bergaya museum digital, dibuat dengan HTML, CSS, dan JavaScript tanpa framework atau instalasi.

## Menjalankan website

Buka `index.html` di browser, lalu pilih **Koleksi** pada navigasi untuk masuk ke ruang museum digital (`koleksi.html`). Koneksi internet diperlukan untuk memuat font dan foto contoh dari Google Fonts, Pexels, dan Unsplash.

## Menghubungkan WhatsApp toko

1. Buka `data.js`.
2. Isi `WHATSAPP_NUMBER` di baris awal dengan nomor toko dan kode negara, tanpa tanda `+`, spasi, atau tanda baca. Contoh format:

   ```js
   const WHATSAPP_NUMBER = "6281234567890";
   ```

3. Simpan file dan muat ulang website. Tombol **Kirim via WhatsApp** akan terbuka dengan pesan yang sudah disiapkan.

Jika nomor belum diisi, pengunjung dapat menyalin pesan. Contoh nomor di atas hanya menunjukkan format; gunakan nomor WhatsApp Anda sendiri.

## Mengganti koleksi

Ubah daftar `products` di `data.js` dengan data barang asli. Setiap barang memiliki kode (`id`), nama (`name`), kategori (`category`), alamat foto utama (`image`), teks alternatif gambar (`alt`), deskripsi (`description`), dan paragraf riwayat (`history`). Kategori yang tersedia pada filter beranda adalah `Keramik`, `Dekorasi`, dan `Vintage`. Anda juga dapat mengisi `period` dan `origin` dengan informasi yang diketahui.

Untuk menampilkan foto asli dari beberapa sudut, tambahkan daftar `photos` pada barang yang bersangkutan. Contoh:

```js
{
  id: "ZA-001",
  name: "Nama barang",
  category: "Keramik",
  image: "foto/barang-tampak-depan.jpg",
  alt: "Tampak depan barang",
  description: "Deskripsi barang.",
  history: ["Riwayat barang yang telah diketahui."],
  period: "Tahun atau periode barang",
  origin: "Asal barang",
  photos: [
    { src: "foto/barang-samping.jpg", alt: "Tampak samping barang", caption: "TAMPAK SAMPING" },
    { src: "foto/barang-detail.jpg", alt: "Detail barang", caption: "DETAIL BARANG" }
  ]
}
```

Simpan file foto di lokasi yang sesuai dengan alamatnya. Jika `photos` belum diisi, halaman koleksi menampilkan foto utama dan potongan detailnya sebagai contoh; potongan itu bukan foto dari sudut berbeda.

Foto, nama, deskripsi, dan cerita yang disertakan saat ini hanya contoh, bukan inventaris atau informasi asal-usul barang yang sebenarnya. Sesuaikan juga tulisan penanda koleksi contoh di `index.html`, `koleksi.html`, `script.js`, dan `koleksi.js` setelah mengganti data.

Website ini adalah katalog statis: pertanyaan pembelian diteruskan melalui WhatsApp setelah nomor dikonfigurasi; pembayaran, stok, dan pesanan belum terhubung ke sistem backend.

## Sumber foto contoh

- [Pexels: vas dekoratif](https://www.pexels.com/photo/decorated-pottery-vase-15256347/)
- [Pexels: jam meja](https://www.pexels.com/photo/vintage-clock-in-an-antique-shop-window-16470625/)
- [Pexels: kamera vintage](https://www.pexels.com/search/vintage%20camera/)
- [Pexels: cangkir klasik](https://www.pexels.com/photo/two-white-teacups-on-black-tray-265006/)
- [Pexels: vas biru](https://www.pexels.com/photo/ceramic-blue-ornate-vase-20239419/)
- [Pexels: radio vintage](https://www.pexels.com/search/vintage%20radio/)
- [Pexels: dekorasi kuningan](https://www.pexels.com/photo/table-with-plate-and-vases-18082508/)
- [Pexels: ruang barang antik](https://www.pexels.com/collections/antiques-aiaopd4/)
- [Unsplash: lukisan bunga klasik](https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5)
