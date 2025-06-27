const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/////////////////////////////////////
//Shape Master
router.get('/shapes', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT id,name,shortname,image,svg_image FROM diamond_shape_master order by sort_order ASC');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//Shape Master by ID
router.get('/shapes/:id', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT id,name,shortname,image,svg_image FROM diamond_shape_master WHERE id = ? order by sort_order ASC', [req.params.id]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/////////////////////////////////////

//Stone Type
router.get('/stonetype', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT dst_id,parent_id,dst_name,dst_short_name,dst_image FROM diamond_stone_type where dst_status = 1 order by dst_sort_order ASC');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//Stone Type by ID
router.get('/stonetype/:id', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT dst_id,parent_id,dst_name,dst_short_name,dst_image FROM diamond_stone_type WHERE parent_id = ? order by dst_sort_order ASC', [req.params.id]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

///////////////////////////////////
//Product Stone Type
router.get('/productstonetype', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT pst_id,pst_category_id,pst_name,pst_name,pst_description,pst_image FROM shop_products_stone_type where pst_status = 1 and pst_display_in_front = 1 order by pst_sort_order ASC');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//Product Stone Type by ID
router.get('/productstonetype/:id', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT pst_id,pst_category_id,pst_name,pst_name,pst_description,pst_image FROM shop_products_stone_type WHERE pst_status = 1 and pst_display_in_front = 1 and pst_category_id = ? order by pst_sort_order ASC', [req.params.id]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

///////////////////////////////////
//products style group
router.get('/stylegroup', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT psg_id,psg_category_id,psg_name,psg_name,psg_image FROM shop_products_style_group where psg_status = 1  order by psg_sort_order ASC');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//Product Style Group by ID
router.get('/stylegroup/:id', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT psg_id,psg_category_id,psg_name,psg_name,psg_image FROM shop_products_style_group WHERE psg_status = 1  and psg_category_id = ? ORDER BY psg_name ASC', [req.params.id]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

///////////////////////////////////

//products Style Category
router.get('/stylecategory', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT psc_id,psc_category_id,psc_name,psc_image,psc_alias FROM shop_products_style_category where psc_status = 1 and psc_display_in_front = 1 order by psc_sort_order ASC');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//Product Style Category by ID
router.get('/stylecategory/:id', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT psc_id,psc_category_id,psc_name,psc_image,psc_alias FROM shop_products_style_category WHERE psc_status = 1 and psc_display_in_front = 1 and psc_category_id = ? ORDER BY psc_sort_order ASC', [req.params.id]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
