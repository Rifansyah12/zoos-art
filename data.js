// Isi nomor WhatsApp toko dengan kode negara, tanpa tanda + atau spasi.
// Contoh format: "6281234567890". Kosongkan sampai nomor toko tersedia.
const WHATSAPP_NUMBER = "";

// Seluruh data ini adalah contoh. Ganti dengan koleksi dan riwayat asli Zoos ART.
// Untuk foto dari sudut berbeda, tambahkan properti photos seperti contoh di README.
const products = [
  {
    id: "ZA-001",
    name: "Vas Porselen Klasik",
    category: "Keramik",
    image: "https://images.pexels.com/photos/15256347/pexels-photo-15256347.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Vas porselen dekoratif dengan motif bunga dalam ruangan bernuansa hangat",
    description: "Vas bermotif klasik dengan detail dekoratif yang menghadirkan karakter hangat dalam sebuah ruang. Sebuah contoh koleksi untuk pencinta keramik.",
    history: [
      "Porselen telah lama dihargai karena permukaannya yang halus dan kemampuannya menyimpan motif-motif yang rumit. Bentuk dan hiasannya membawa kita pada tradisi menghias ruang yang diwariskan dari masa ke masa.",
      "Perhatikan corak bunga dan perpaduan warnanya. Setiap detail mengajak kita membayangkan tangan-tangan yang pernah membuat, merawat, dan menikmati keindahannya."
    ]
  },
  {
    id: "ZA-002",
    name: "Jam Meja Berornamen",
    category: "Dekorasi",
    image: "https://images.pexels.com/photos/16470625/pexels-photo-16470625.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Jam meja berornamen warna emas di antara vas dekoratif",
    description: "Bentuk klasik dan detail berornamen menjadikan jam meja ini sebuah aksen yang menarik untuk dinikmati dari waktu ke waktu.",
    history: [
      "Jam meja klasik bukan hanya penunjuk waktu. Bentuknya yang penuh ornamen menjadikannya bagian dari dekorasi dan kehidupan sehari-hari di berbagai masa.",
      "Dari angka pada permukaannya hingga lekuk bingkainya, detail-detail kecilnya mengingatkan kita bahwa benda fungsional juga dapat dinikmati sebagai karya seni."
    ]
  },
  {
    id: "ZA-003",
    name: "Kamera Film Vintage",
    category: "Vintage",
    image: "https://images.pexels.com/photos/16104735/pexels-photo-16104735.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Kamera film vintage berwarna perak dan hitam",
    description: "Kamera film dengan tampilan klasik yang mengingatkan pada cara lama mengabadikan momen. Contoh koleksi bagi pencinta fotografi vintage.",
    history: [
      "Sebelum gambar dapat dilihat seketika di layar, kamera film mengajak orang memilih setiap bidikan dengan penuh perhatian. Setiap gulungan menyimpan potongan waktu yang menunggu untuk dicetak.",
      "Bodi, lensa, dan kenopnya menyimpan pesona desain mekanis sekaligus mengingatkan pada cerita-cerita yang pernah diabadikan."
    ]
  },
  {
    id: "ZA-004",
    name: "Cangkir & Dekorasi Klasik",
    category: "Keramik",
    image: "https://images.pexels.com/photos/265006/pexels-photo-265006.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Dua cangkir bermotif bunga bersama dekorasi bergaya klasik",
    description: "Cangkir bermotif dan dekorasi bernuansa klasik, menghadirkan detail yang akrab dan penuh pesona untuk sudut kesayangan.",
    history: [
      "Cangkir dan benda-benda kecil di meja sering hadir dalam momen yang paling akrab: percakapan, jamuan, dan waktu yang diluangkan bersama.",
      "Motif dan bentuknya mencerminkan perhatian pada keindahan dalam keseharian—sebuah kebiasaan yang terus menemukan tempatnya hingga kini."
    ]
  },
  {
    id: "ZA-005",
    name: "Vas Biru Putih",
    category: "Keramik",
    image: "https://images.pexels.com/photos/20239419/pexels-photo-20239419.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Vas keramik biru putih dengan detail motif halus",
    description: "Perpaduan warna biru dan putih serta motif dekoratif memberikan sentuhan klasik yang mudah dinikmati dalam berbagai suasana.",
    history: [
      "Keramik biru dan putih memiliki perjalanan panjang dalam dunia seni dekoratif. Kontras warnanya membuat beragam motif terlihat hidup di atas permukaan yang terang.",
      "Dari kejauhan bentuknya menarik perhatian; dari dekat, detail pola-pola halusnya memberikan alasan untuk berhenti dan mengamati lebih lama."
    ]
  },
  {
    id: "ZA-006",
    name: "Radio Klasik",
    category: "Vintage",
    image: "https://images.pexels.com/photos/5161816/pexels-photo-5161816.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Radio vintage dengan kenop perak dan panel kain",
    description: "Radio bergaya vintage yang membawa kenangan pada masa ketika cerita dan musik memenuhi ruang keluarga.",
    history: [
      "Radio pernah menjadi pusat suara di rumah: tempat berita, musik, dan cerita datang dari jauh. Bentuk dan kenopnya kini mengingatkan pada pengalaman mendengarkan yang berbeda.",
      "Sebagai benda dekoratif, radio klasik membawa karakter hangat sekaligus kenangan tentang momen yang dinikmati bersama."
    ]
  },
  {
    id: "ZA-007",
    name: "Lukisan Bunga Klasik",
    category: "Dekorasi",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=80",
    alt: "Lukisan klasik rangkaian bunga berwarna-warni dengan latar gelap",
    description: "Komposisi bunga dan warna-warna yang kaya menghadirkan suasana galeri klasik ke dalam sebuah ruang.",
    history: [
      "Lukisan bunga telah lama digunakan untuk menangkap keindahan yang singkat. Melalui warna, cahaya, dan komposisi, sesuatu yang sementara diabadikan untuk dinikmati lebih lama.",
      "Latar yang gelap membuat setiap warna bunga tampak menonjol, mengundang mata menjelajahi detail demi detail."
    ]
  },
  {
    id: "ZA-008",
    name: "Dekorasi Kuningan",
    category: "Dekorasi",
    image: "https://images.pexels.com/photos/18082508/pexels-photo-18082508.jpeg?auto=compress&cs=tinysrgb&w=900",
    alt: "Beragam benda dekoratif kuningan di atas meja",
    description: "Kumpulan benda dekoratif bernuansa kuningan dengan bentuk yang beragam, untuk menambahkan kehangatan dan cerita pada ruangan.",
    history: [
      "Benda logam dekoratif disukai karena bentuk, kilau, dan karakter permukaannya. Seiring waktu, tampilannya dapat berkembang dan menghadirkan pesona yang khas.",
      "Lekuk dan detailnya mengajak kita melihat kembali bagaimana benda sehari-hari juga bisa dibuat dengan perhatian pada keindahan."
    ]
  }
];
