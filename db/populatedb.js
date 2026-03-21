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
    name: "ASICS Gel-Kayano 31",
    brand: "ASICS",
    category: "running shoes",
    stock: 9,
    price: 160,
    description:
      "A stability running shoe engineered for overpronators, featuring GEL technology and FF Blast+ cushioning.",
    image_url: "/images/asics-gel-kayano-31.png",
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
    name: "Vans Old Skool",
    brand: "Vans",
    category: "skate shoes",
    stock: 25,
    price: 70,
    description:
      "The iconic low-top skate shoe with a durable canvas and suede upper and signature side stripe.",
    image_url: "/images/vans-old-skool.png",
  },
  {
    name: "DC Shoes Court Graffik",
    brand: "DC Shoes",
    category: "skate shoes",
    stock: 13,
    price: 75,
    description:
      "A skate-ready shoe with a padded tongue and collar, built for board feel and lasting durability.",
    image_url: "/images/dc-court-graffik.png",
  },
  {
    name: "Emerica Reynolds G6",
    brand: "Emerica",
    category: "skate shoes",
    stock: 9,
    price: 85,
    description:
      "A pro-level skate shoe with a cupsole construction and Hex-Tec insole for superior impact protection.",
    image_url: "/images/emerica-reynolds-g6.png",
  },

  // Sandals & slides
  {
    name: "Adidas Adilette Aqua",
    brand: "Adidas",
    category: "sandals & slides",
    stock: 30,
    price: 35,
    description:
      "Lightweight and quick-drying slides perfect for poolside or post-workout recovery.",
    image_url: "/images/adidas-adilette-aqua.png",
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

  // Retro
  {
    name: "New Balance 990v6",
    brand: "New Balance",
    category: "retro sneakers",
    stock: 10,
    price: 185,
    description:
      "A made-in-USA icon with premium suede and mesh upper, delivering unmatched comfort and heritage style.",
    image_url: "/images/new-balance-990v6.png",
  },
  {
    name: "Adidas Gazelle",
    brand: "Adidas",
    category: "retro sneakers",
    stock: 17,
    price: 100,
    description:
      "A 70s-born classic with a soft suede upper and serrated 3-Stripes, reborn as a modern streetwear staple.",
    image_url: "/images/adidas-gazelle.png",
  },
  {
    name: "Nike Air Max 90",
    brand: "Nike",
    category: "retro sneakers",
    stock: 13,
    price: 130,
    description:
      "A vintage icon featuring the original large Air unit, waffle outsole, and bold color-blocked paneling.",
    image_url: "/images/nike-air-max-90.png",
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
  {
    name: "New Balance 574 Joe Freshgoods",
    brand: "New Balance",
    category: "limited edition",
    stock: 4,
    price: 150,
    description:
      "A soulful collab with Chicago designer Joe Freshgoods, blending nostalgic tones with premium materials.",
    image_url: "/images/nb-574-joe-freshgoods.png",
  },
  {
    name: "Nike SB Dunk Low Travis Scott",
    brand: "Nike",
    category: "limited edition",
    stock: 3,
    price: 350,
    description:
      "A highly sought-after collab with Travis Scott featuring a reverse Swoosh and earthy tonal colorway.",
    image_url: "/images/nike-sb-dunk-travis-scott.png",
  },
];

async function populateDb() {
  console.log("Sending default products...");

  for (const product of defaultProducts) {
    await pool.query(
      "INSERT INTO sneakers (name, brand, category, stock, price, description, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT DO NOTHING",
      [
        product.name,
        product.brand,
        product.category,
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
