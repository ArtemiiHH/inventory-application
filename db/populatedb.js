const pool = require("../db/pool");

const defaultProducts = [
  // Sneakers
  {
    name: "Nike Dunk Low Panda",
    brand: "Nike",
    category: "sneakers",
    stock: 10,
    price: 120,
    description: "A classic and timeless Dunk Low in Panda colorway.",
    image_url: "/images/nike-dunk-low-panda.png",
  },
  {
    name: "Nike Air Force 1",
    brand: "Nike",
    category: "sneakers",
    stock: 50,
    price: 100,
    description: "A classic, all-white Air Force 1.",
    image_url: "/images/nike-air-force-one.png",
  },
  {
    name: "Nike Air Max",
    brand: "Nike",
    category: "sneakers",
    stock: 30,
    price: 130,
    description: "Iconic Air Max NY with air cushioning.",
    image_url: "/images/nike-air-max.png",
  },

  // Running
  {
    name: "Nike Pegasus 41",
    brand: "Nike",
    category: "running shoes",
    stock: 18,
    price: 130,
    description:
      "A versatile everyday trainer with responsive React foam cushioning for smooth, reliable rides.",
    image_url: "/images/nike-pegasus-41.png",
  },
  {
    name: "Adidas Ultraboost 24",
    brand: "Adidas",
    category: "running shoes",
    stock: 14,
    price: 190,
    description:
      "Premium running shoe with energy-returning Boost midsole and a snug Primeknit upper.",
    image_url: "/images/adidas-ultraboost-24.png",
  },
  {
    name: "ASICS Novablast 5",
    brand: "ASICS",
    category: "running shoes",
    stock: 9,
    price: 160,
    description:
      "A stability running shoe engineered for overpronators, featuring GEL technology and FF Blast+ cushioning.",
    image_url: "/images/asics-novablast5.png",
  },

  // Basketball
  {
    name: "Nike LeBron 21",
    brand: "Nike",
    category: "basketball shoes",
    stock: 12,
    price: 200,
    description:
      "Engineered for dominance on the court with Max Air cushioning and a supportive woven upper.",
    image_url: "/images/nike-lebron-21.png",
  },
  {
    name: "Adidas Harden Vol. 8",
    brand: "Adidas",
    category: "basketball shoes",
    stock: 8,
    price: 160,
    description:
      "James Harden's signature shoe featuring Lightstrike Pro cushioning for explosive step-back moves.",
    image_url: "/images/adidas-harden-vol-8.png",
  },
  {
    name: "Jordan 38 Low",
    brand: "Jordan",
    category: "basketball shoes",
    stock: 11,
    price: 180,
    description:
      "A low-cut performance basketball shoe built with responsive Zoom Air and a breathable mesh upper for quickness and agility.",
    image_url: "/images/jordan-38-low.png",
  },

  // Skate shoes
  {
    name: "Nike SB Dunk Low Pro",
    brand: "Nike",
    category: "skate shoes",
    stock: 16,
    price: 110,
    description:
      "A skate-ready evolution of the classic Dunk with a padded tongue, Zoom Air insole, and durable suede overlays.",
    image_url: "/images/nike-sb-dunk-low-pro.png",
  },
  {
    name: "Nike SB Blazer Low GT",
    brand: "Nike",
    category: "skate shoes",
    stock: 11,
    price: 100,
    description:
      "A low-cut skate shoe built on the classic Blazer silhouette with a Zoom Air unit and grippy rubber outsole.",
    image_url: "/images/nike-sb-blazer-low-gt.png",
  },
  {
    name: "Adidas Samba Classic",
    brand: "Adidas",
    category: "skate shoes",
    stock: 18,
    price: 90,
    description:
      "A timeless indoor soccer-turned-streetwear icon with a soft leather upper and durable rubber outsole.",
    image_url: "/images/adidas-samba-classic.png",
  },

  // Sandals & slides
  {
    name: "Adidas Adilette Lumia",
    brand: "Adidas",
    category: "sandals & slides",
    stock: 30,
    price: 35,
    description:
      "Lightweight and quick-drying slides perfect for poolside or post-workout recovery.",
    image_url: "/images/adidas-adilette.png",
  },
  {
    name: "Nike Victori One Slide",
    brand: "Nike",
    category: "sandals & slides",
    stock: 22,
    price: 40,
    description:
      "A cushioned everyday slide with a soft foam footbed and a secure single-strap design.",
    image_url: "/images/nike-victori-one-slide.png",
  },
  {
    name: "Birkenstock Arizona",
    brand: "Birkenstock",
    category: "sandals & slides",
    stock: 18,
    price: 110,
    description:
      "The legendary two-strap sandal with a contoured cork-latex footbed that molds to the shape of your foot.",
    image_url: "/images/birkenstock-arizona.png",
  },

  // Limited edition
  {
    name: "Adidas Yeezy Boost 350 V2",
    brand: "Adidas",
    category: "limited edition",
    stock: 5,
    price: 250,
    description:
      "Kanye West's iconic silhouette with a Primeknit upper and full-length Boost midsole in coveted colorways.",
    image_url: "/images/yeezy-boost-350-v2.png",
  },
];

async function populateDb() {
  console.log("Sending default products...");

  for (const product of defaultProducts) {
    const { rows } = await pool.query(
      "SELECT category_id FROM categories WHERE category = $1",
      [product.category],
    );
    const category_id = rows[0]?.category_id || null;

    await pool.query(
      "INSERT INTO sneakers (name, brand, category_id, stock, price, description, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT DO NOTHING",
      [
        product.name,
        product.brand,
        category_id,
        product.stock,
        product.price,
        product.description,
        product.image_url,
      ],
    );
  }

  console.log("Done sending!");
  pool.end();
}

populateDb();
