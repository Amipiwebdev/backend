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
    const [results] = await pool.query('SELECT id,name,shortname,image FROM diamond_shape_master order by sort_order ASC');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//Shape Master by ID
router.get('/shapes/:id', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT id,name,shortname,image FROM diamond_shape_master WHERE id = ? order by sort_order ASC', [req.params.id]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Shapes
router.get('/shapes/byids/:ids', async (req, res) => {
  const ids = req.params.ids.split(',').map(id => id.trim());
  if (!ids.length) return res.json([]);
  const [results] = await pool.query(
    `SELECT * FROM diamond_shape_master WHERE id IN (?) ORDER BY sort_order ASC`, [ids]
  );
  res.json(results);
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

// Product Stone Type by IDs
router.get('/productstonetype/byids/:ids', async (req, res) => {
  try {
    const ids = req.params.ids.split(',').map(id => id.trim());
    if (!ids.length) return res.json([]);
    const [results] = await pool.query(
      `SELECT pst_id, pst_category_id, pst_name, pst_description, pst_image
       FROM shop_products_stone_type
       WHERE pst_status = 1
         AND pst_display_in_front = 1
         AND pst_id IN (?)
       ORDER BY pst_sort_order ASC`, [ids]
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Stone Types
router.get('/stonetype/byids/:ids', async (req, res) => {
  const ids = req.params.ids.split(',').map(id => id.trim());
  if (!ids.length) return res.json([]);
  const [results] = await pool.query(
    `SELECT * FROM diamond_stone_type WHERE dst_id IN (?) ORDER BY dst_sort_order ASC`, [ids]
  );
  res.json(results);
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

// Style Groups
router.get('/stylegroup/byids/:ids', async (req, res) => {
  const ids = req.params.ids.split(',').map(id => id.trim());
  if (!ids.length) return res.json([]);
  const [results] = await pool.query(
    `SELECT * FROM shop_products_style_group WHERE psg_id IN (?) ORDER BY psg_sort_order ASC`, [ids]
  );
  res.json(results);
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

// Style Categories
router.get('/stylecategory/byids/:ids', async (req, res) => {
  const ids = req.params.ids.split(',').map(id => id.trim());
  if (!ids.length) return res.json([]);
  const [results] = await pool.query(
    `SELECT * FROM shop_products_style_category WHERE psc_id IN (?) ORDER BY psc_sort_order ASC`, [ids]
  );
  res.json(results);
});

//Product Style Category by ID
router.get('/catnav/:url', async (req, res) => {
  //.log(`SELECT * FROM category_navigation WHERE category_navigation_seo_url = ${req.params.url}`);
  try {
    const [results] = await pool.query('SELECT * FROM category_navigation WHERE category_navigation_seo_url = ?', [req.params.url]);   
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
///////////Metal Ty///////////
//Metal Type
router.get('/metaltype', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT dmt_id, dmt_name, dmt_tooltip, color_code FROM diamond_metal_type where dmt_status = 1  order by sort_order ASC');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//Metal Type ID
router.get('/metaltype/:id', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT dmt_id, dmt_name, dmt_tooltip, color_code FROM diamond_metal_type WHERE dmt_status = 1  and dmt_id = ? ORDER BY sort_order ASC', [req.params.id]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Metal Type
router.get('/metaltype/byids/:ids', async (req, res) => {
  const ids = req.params.ids.split(',').map(id => id.trim());
  if (!ids.length) return res.json([]);
  const [results] = await pool.query(
    `SELECT * FROM diamond_metal_type WHERE dmt_id IN (?) ORDER BY sort_order ASC`, [ids]
  );
  res.json(results);
});

///////////Quality///////////
//Quality
router.get('/quality', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT dqg_id, dqg_name,dqg_alias, description, dqg_origin FROM diamond_quality_group where dqg_status = 1  order by dqg_sort_order ASC');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//Quality ID
router.get('/quality/:id', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT dqg_id, dqg_name,dqg_alias, description, dqg_icon,dqg_origin FROM diamond_quality_group WHERE dqg_status = 1  and dqg_id = ? ORDER BY dqg_sort_order ASC', [req.params.id]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Quality
router.get('/quality/byids/:ids', async (req, res) => {
  const ids = req.params.ids.split(',').map(id => id.trim());
  if (!ids.length) return res.json([]);
  const [results] = await pool.query(
    `SELECT * FROM diamond_quality_group WHERE dqg_id IN (?) ORDER BY dqg_sort_order ASC`, [ids]
  );
  res.json(results);
});

/////////////Diamond Size//////////////////////
router.get('/diamond-sizes', async (req, res) => {
  try {
    // get the filters from query params
    const filters = [];
    const params = [];

    if (req.query.stone_type) {
      filters.push('sptst.sptst_stone_type_id = ?');
      params.push(req.query.stone_type);
    }
    // ... add other filters the same way

    const sql = `
      SELECT DISTINCT pm.center_stone_weight
      FROM shop_products pm
      LEFT JOIN shop_products_to_stone_type sptst ON pm.products_id = sptst.sptst_products_id
      -- add other joins if filtering by them
      WHERE pm.products_quantity <> 0
      AND pm.product_image_status = 1
      ${filters.length ? 'AND ' + filters.join(' AND ') : ''}
      ORDER BY pm.center_stone_weight ASC
      LIMIT 20
    `;
    const [results] = await pool.query(sql, params);
    res.json(results.map(r => r.center_stone_weight));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//////////////////////////////

//band products
router.get('/product', async (req, res) => {
  try {
    const filters = [];
    const params = [];

    // Map query param to DB column/table
    if (req.query.stone_type) {
      filters.push('sptst.sptst_stone_type_id = ?');
      params.push(req.query.stone_type);
    }
    if (req.query.style_group) {
      filters.push('sptsg.sptsg_style_category_id = ?');
      params.push(req.query.style_group);
    }
    if (req.query.style_category) {
      filters.push('sptsc.sptsc_style_category_id = ?');
      params.push(req.query.style_category);
    }
    if (req.query.shape) {
      filters.push('pts.shape_id = ?');
      params.push(req.query.shape);
    }
    if (req.query.metal) {
      filters.push('sptmt.sptmt_metal_type_id = ?');
      params.push(req.query.metal);
    }
    if (req.query.quality) {
      filters.push('pm.diamond_quality_id = ?');
      params.push(req.query.quality);
    }
    if (req.query.diamond_size) {
      filters.push('pm.center_stone_weight = ?');
      params.push(req.query.diamond_size);
    }
    // Add other filters as needed

    // Base query (optimized as per last answer)
    const sql = `
      SELECT 
    pm.product_promotion, 
    pm.available_type, 
    pm.is_build_product, 
    pm.is_superdeals, 
    pm.is_new, 
    pm.products_id, 
    pm.products_style_no, 
    pm.products_seo_url, 
    pm.design_id, 
    pm.diamond_quality_id, 
    pm.diamond_weight_group_id, 
    pd.products_name, 
    pd.products_blurb, 
    pd.products_description, 
    pi.image_url AS main_image, 
    pm.products_price1,  
    pm.total_carat_weight,
    pm.tariff_per,
    pm.vender_id,
    dqg.dqg_alias as dqg_alias,
    css.dcst_name AS center_stone_name,
    dmt.dmt_name AS metal_name,
    psg.psg_name AS style_group_name,
    psc.psc_name AS style_category_name,
    dsm.name AS diamond_shape_name   
FROM shop_products pm
LEFT JOIN shop_products_description pd ON pm.products_id = pd.products_id AND pd.language_id = 1
LEFT JOIN shop_products_image pi ON pm.products_id = pi.products_id AND pi.image_type = 'image'
LEFT JOIN shop_products_to_stone_type sptst ON pm.products_id = sptst.sptst_products_id
LEFT JOIN shop_products_to_style_group sptsg ON pm.products_id = sptsg.sptsg_products_id
LEFT JOIN shop_products_style_group psg ON psg.psg_id = sptsg.sptsg_style_category_id
LEFT JOIN shop_products_to_style_category sptsc ON pm.products_id = sptsc.sptsc_products_id
LEFT JOIN shop_products_style_category psc ON psc.psc_id = sptsc.sptsc_style_category_id
LEFT JOIN shop_products_to_metal_type sptmt ON pm.products_id = sptmt.sptmt_products_id
LEFT JOIN diamond_metal_type dmt ON dmt.dmt_id = sptmt.sptmt_metal_type_id
LEFT JOIN shop_products_to_shape pts ON pm.products_id = pts.products_id
LEFT JOIN diamond_shape_master dsm ON dsm.id = pts.shape_id   
LEFT JOIN diamond_quality_group AS dqg ON dqg.dqg_id = pm.diamond_quality_id
LEFT JOIN diamond_center_stone_type AS css ON pm.center_stone_type_id = css.dcst_id
WHERE pm.products_quantity <> 0
  AND pm.product_image_status = 1
  ${filters.length ? 'AND ' + filters.join(' AND ') : ''}
GROUP BY pm.design_id
ORDER BY pm.products_id DESC
LIMIT 1

    `;

    const [results] = await pool.query(sql, params);
    const product = results[0];

    if (!product) {
      return res.json({});
    }

    // 1. Get images for the product
    const [images] = await pool.query(
      `SELECT image_url, image_type FROM shop_products_image WHERE products_id = ? ORDER BY sort_order ASC`,
      [product.products_id]
    );

    // 2. Separate images and videos
    product.images = images.filter(img => img.image_type === 'image').map(img => img.image_url);
    product.videos = images.filter(img => img.image_type === 'video').map(img => img.image_url);

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/// filter Options ////

router.get('/filter-options', async (req, res) => {
  try {
    // We’ll use the same filters logic as your /product endpoint.
    // (parse them once for re-use)
    const {
      stone_type,
      style_group,
      style_category,
      shape,
      metal,
      quality,
      diamond_size
    } = req.query;

    // Helper: collect filter SQL for each group except the target group
    function buildFilters(exclude) {
      const filters = [];
      const params = [];
      if (stone_type && exclude !== 'stone_type') {
        filters.push('sptst.sptst_stone_type_id = ?');
        params.push(stone_type);
      }
      if (style_group && exclude !== 'style_group') {
        filters.push('sptsg.sptsg_style_category_id = ?');
        params.push(style_group);
      }
      if (style_category && exclude !== 'style_category') {
        filters.push('sptsc.sptsc_style_category_id = ?');
        params.push(style_category);
      }
      if (shape && exclude !== 'shape') {
        filters.push('pts.shape_id = ?');
        params.push(shape);
      }
      if (metal && exclude !== 'metal') {
        filters.push('sptmt.sptmt_metal_type_id = ?');
        params.push(metal);
      }
      if (quality && exclude !== 'quality') {
        filters.push('pm.diamond_quality_id = ?');
        params.push(quality);
      }
      if (diamond_size && exclude !== 'diamond_size') {
        filters.push('pm.center_stone_weight = ?');
        params.push(diamond_size);
      }
      return { filters, params };
    }

    // For each group, get the allowed values
    // (repeat the main product joins/WHERE for each, just change the SELECT and omit the current group from filters)
    const queries = [
      {
        key: 'stone_types',
        sql: `
          SELECT DISTINCT sptst.sptst_stone_type_id AS id
          FROM shop_products pm
          LEFT JOIN shop_products_to_stone_type sptst ON pm.products_id = sptst.sptst_products_id
          LEFT JOIN shop_products_to_style_group sptsg ON pm.products_id = sptsg.sptsg_products_id
          LEFT JOIN shop_products_to_style_category sptsc ON pm.products_id = sptsc.sptsc_products_id
          LEFT JOIN shop_products_to_metal_type sptmt ON pm.products_id = sptmt.sptmt_products_id
          LEFT JOIN shop_products_to_shape pts ON pm.products_id = pts.products_id
          WHERE pm.products_quantity <> 0
            AND pm.product_image_status = 1
            ${buildFilters('stone_type').filters.length ? 'AND ' + buildFilters('stone_type').filters.join(' AND ') : ''}
        `,
        params: buildFilters('stone_type').params
      },
      {
        key: 'style_groups',
        sql: `
          SELECT DISTINCT sptsg.sptsg_style_category_id AS id
          FROM shop_products pm
          LEFT JOIN shop_products_to_stone_type sptst ON pm.products_id = sptst.sptst_products_id
          LEFT JOIN shop_products_to_style_group sptsg ON pm.products_id = sptsg.sptsg_products_id
          LEFT JOIN shop_products_to_style_category sptsc ON pm.products_id = sptsc.sptsc_products_id
          LEFT JOIN shop_products_to_metal_type sptmt ON pm.products_id = sptmt.sptmt_products_id
          LEFT JOIN shop_products_to_shape pts ON pm.products_id = pts.products_id
          WHERE pm.products_quantity <> 0
            AND pm.product_image_status = 1
            ${buildFilters('style_group').filters.length ? 'AND ' + buildFilters('style_group').filters.join(' AND ') : ''}
        `,
        params: buildFilters('style_group').params
      },
      {
        key: 'style_categories',
        sql: `
          SELECT DISTINCT sptsc.sptsc_style_category_id AS id
          FROM shop_products pm
          LEFT JOIN shop_products_to_stone_type sptst ON pm.products_id = sptst.sptst_products_id
          LEFT JOIN shop_products_to_style_group sptsg ON pm.products_id = sptsg.sptsg_products_id
          LEFT JOIN shop_products_to_style_category sptsc ON pm.products_id = sptsc.sptsc_products_id
          LEFT JOIN shop_products_to_metal_type sptmt ON pm.products_id = sptmt.sptmt_products_id
          LEFT JOIN shop_products_to_shape pts ON pm.products_id = pts.products_id
          WHERE pm.products_quantity <> 0
            AND pm.product_image_status = 1
            ${buildFilters('style_category').filters.length ? 'AND ' + buildFilters('style_category').filters.join(' AND ') : ''}
        `,
        params: buildFilters('style_category').params
      },
      {
        key: 'shapes',
        sql: `
          SELECT DISTINCT pts.shape_id AS id
          FROM shop_products pm
          LEFT JOIN shop_products_to_stone_type sptst ON pm.products_id = sptst.sptst_products_id
          LEFT JOIN shop_products_to_style_group sptsg ON pm.products_id = sptsg.sptsg_products_id
          LEFT JOIN shop_products_to_style_category sptsc ON pm.products_id = sptsc.sptsc_products_id
          LEFT JOIN shop_products_to_metal_type sptmt ON pm.products_id = sptmt.sptmt_products_id
          LEFT JOIN shop_products_to_shape pts ON pm.products_id = pts.products_id
          WHERE pm.products_quantity <> 0
            AND pm.product_image_status = 1
            ${buildFilters('shape').filters.length ? 'AND ' + buildFilters('shape').filters.join(' AND ') : ''}
        `,
        params: buildFilters('shape').params
      },
      {
        key: 'metals',
        sql: `
          SELECT DISTINCT sptmt.sptmt_metal_type_id AS id
          FROM shop_products pm
          LEFT JOIN shop_products_to_stone_type sptst ON pm.products_id = sptst.sptst_products_id
          LEFT JOIN shop_products_to_style_group sptsg ON pm.products_id = sptsg.sptsg_products_id
          LEFT JOIN shop_products_to_style_category sptsc ON pm.products_id = sptsc.sptsc_products_id
          LEFT JOIN shop_products_to_metal_type sptmt ON pm.products_id = sptmt.sptmt_products_id
          LEFT JOIN shop_products_to_shape pts ON pm.products_id = pts.products_id
          WHERE pm.products_quantity <> 0
            AND pm.product_image_status = 1
            ${buildFilters('metal').filters.length ? 'AND ' + buildFilters('metal').filters.join(' AND ') : ''}
        `,
        params: buildFilters('metal').params
      },
      {
        key: 'qualities',
        sql: `
          SELECT DISTINCT pm.diamond_quality_id AS id
          FROM shop_products pm
          LEFT JOIN shop_products_to_stone_type sptst ON pm.products_id = sptst.sptst_products_id
          LEFT JOIN shop_products_to_style_group sptsg ON pm.products_id = sptsg.sptsg_products_id
          LEFT JOIN shop_products_to_style_category sptsc ON pm.products_id = sptsc.sptsc_products_id
          LEFT JOIN shop_products_to_metal_type sptmt ON pm.products_id = sptmt.sptmt_products_id
          LEFT JOIN shop_products_to_shape pts ON pm.products_id = pts.products_id
          WHERE pm.products_quantity <> 0
            AND pm.product_image_status = 1
            ${buildFilters('quality').filters.length ? 'AND ' + buildFilters('quality').filters.join(' AND ') : ''}
        `,
        params: buildFilters('quality').params
      },
      {
        key: 'diamond_sizes',
        sql: `
          SELECT DISTINCT pm.center_stone_weight AS size
          FROM shop_products pm
          LEFT JOIN shop_products_to_stone_type sptst ON pm.products_id = sptst.sptst_products_id
          LEFT JOIN shop_products_to_style_group sptsg ON pm.products_id = sptsg.sptsg_products_id
          LEFT JOIN shop_products_to_style_category sptsc ON pm.products_id = sptsc.sptsc_products_id
          LEFT JOIN shop_products_to_metal_type sptmt ON pm.products_id = sptmt.sptmt_products_id
          LEFT JOIN shop_products_to_shape pts ON pm.products_id = pts.products_id
          WHERE pm.products_quantity <> 0
            AND pm.product_image_status = 1
            ${buildFilters('diamond_size').filters.length ? 'AND ' + buildFilters('diamond_size').filters.join(' AND ') : ''}
        `,
        params: buildFilters('diamond_size').params
      }
    ];

    // Now, execute all in parallel
    const result = {};
    await Promise.all(queries.map(async q => {
      const [rows] = await pool.query(q.sql, q.params);
      // map to array of IDs/sizes
      if (q.key === 'diamond_sizes') {
        result[q.key] = rows.map(r => r.size);
      } else {
        result[q.key] = rows.map(r => Number(r.id));
      }
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all ring size options for a product
router.get('/product-options/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    // Assuming ring size is always options_id = 2 (as in your screenshots)
    const [options] = await pool.query(`
      SELECT spo.value_id, spov.value_name, spo.options_symbol, spo.estimated_weight, spo.estimated_symbol, spo.options_price
      FROM shop_products_to_options spo
      JOIN shop_products_options_values spov ON spo.value_id = spov.value_id
      WHERE spo.products_id = ? AND spo.options_id = 2
      ORDER BY spov.sort_order ASC
    `, [productId]);
    console.log(`Product Options for ${productId}:`, options);
    res.json(options);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

///store information
router.get('/store-info', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM admin_configuration WHERE configuration_group_id = 4');
    // Convert array to object { STORE_PHONE: '+1...', STORE_EMAIL: '...' }
    const config = {};
    results.forEach(row => {
      config[row.configuration_key] = row.configuration_value;
    });
    res.json(config);  // Now frontend can do store.STORE_PHONE etc.
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


///////Menu Tree Builder//

function buildMenuTree(rows, parent = 0) {
  return rows
    .filter(row => row.category_navigation_parent_item === parent)
    .map(row => ({
      id: row.category_navigation_id,
      page_title: row.category_navigation_title,
      alias: row.category_navigation_alias,
      page_link: row.page_link, // Construct this as needed
      menu_type: row.menu_type,
      icon: row.icon,
      sub_title: row.sub_title,
      image: row.category_navigation_image,
      display_in_col: row.display_in_col,
      sub_nav_col: row.sub_nav_col,
      child: buildMenuTree(rows, row.category_navigation_id)
    }));
}


/// Menu API ////
router.get('/mega-menu', async (req, res) => {
  try {
    const [menuRows] = await pool.query("SELECT * FROM category_navigation WHERE status=1 and category_navigation_dislay_in = 2 ORDER BY category_navigation_sort_order ASC");
    const menuTree = buildMenuTree(menuRows, 0);
    res.json(menuTree);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//new filter API
// GET /api/stone-types
router.get('/stone-types', async (req, res) => {
  try {
    const [results] = await pool.query(
      `SELECT pst_id AS id, pst_name AS name, pst_image AS image
       FROM shop_products_stone_type
       WHERE pst_status=1 AND pst_display_in_front=1
       ORDER BY pst_sort_order ASC`
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/designs?stoneType=ID
router.get('/designs', async (req, res) => {
  try {
    const stoneTypeId = req.query.stoneType;
    if (!stoneTypeId) return res.json([]);

    // Correct JOIN: find designs (style groups) for given stone type through product mapping!
    const [results] = await pool.query(
      `SELECT DISTINCT psg.psg_id AS id, psg.psg_name AS name, psg.psg_image AS image
       FROM shop_products pm
       JOIN shop_products_to_stone_type sptst ON pm.products_id = sptst.sptst_products_id
       JOIN shop_products_to_style_group sptsg ON pm.products_id = sptsg.sptsg_products_id
       JOIN shop_products_style_group psg ON psg.psg_id = sptsg.sptsg_style_category_id
       WHERE sptst.sptst_stone_type_id = ?
         AND psg.psg_status = 1
       ORDER BY psg.psg_sort_order ASC`, 
      [stoneTypeId]
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET /api/setting-styles?stoneType=ID&design=ID
router.get('/setting-styles', async (req, res) => {
  try {
    const { stoneType, design } = req.query;
    if (!stoneType || !design) return res.json([]);
    const [results] = await pool.query(
      `SELECT DISTINCT psc.psc_id AS id, psc.psc_name AS name, psc.psc_image AS image
       FROM shop_products pm
       JOIN shop_products_to_stone_type sptst ON pm.products_id = sptst.sptst_products_id
       JOIN shop_products_to_style_group sptsg ON pm.products_id = sptsg.sptsg_products_id
       JOIN shop_products_to_style_category sptsc ON pm.products_id = sptsc.sptsc_products_id
       JOIN shop_products_style_category psc ON psc.psc_id = sptsc.sptsc_style_category_id
       WHERE sptst.sptst_stone_type_id = ?
         AND sptsg.sptsg_style_category_id = ?
         AND psc.psc_status = 1
         AND psc.psc_display_in_front = 1
       ORDER BY psc.psc_sort_order ASC`,
      [stoneType, design]
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET /api/shapes?stoneType=ID&design=ID&settingStyle=ID
router.get('/shapesnew', async (req, res) => {
  try {
    const { stoneType, design } = req.query;
    if (!stoneType || !design) return res.json([]);
    // Example SQL: adjust table/columns if needed!
    const [results] = await pool.query(
      `SELECT dsm.id, dsm.name, dsm.image
       FROM diamond_shape_master dsm
       JOIN shop_products_to_shape pts ON dsm.id = pts.shape_id
       JOIN shop_products pm ON pm.products_id = pts.products_id
       JOIN shop_products_to_stone_type sptst ON pm.products_id = sptst.sptst_products_id
       JOIN shop_products_to_style_group sptsg ON pm.products_id = sptsg.sptsg_products_id
       WHERE sptst.sptst_stone_type_id = ?
         AND sptsg.sptsg_style_category_id = ?
         AND pm.products_quantity <> 0
         AND pm.product_image_status = 1
       GROUP BY dsm.id
       ORDER BY dsm.sort_order ASC`,
      [stoneType, design]
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET /api/metals?stoneType=ID&design=ID&settingStyle=ID&shape=ID
router.get('/metals', async (req, res) => {
  try {
    const { stoneType, design, settingStyle, shape } = req.query;
    if (!stoneType || !design || !settingStyle || !shape) return res.json([]);
    const [results] = await pool.query(
      `SELECT dmt.dmt_id AS id, dmt.dmt_name AS name, dmt.color_code
       FROM diamond_metal_type dmt
       JOIN shop_products_to_metal_type sptmt ON sptmt.sptmt_metal_type_id = dmt.dmt_id
       JOIN shop_products pm ON pm.products_id = sptmt.sptmt_products_id
       JOIN shop_products_to_stone_type sptst ON sptst.sptst_products_id = pm.products_id
       JOIN shop_products_to_style_group sptsg ON sptsg.sptsg_products_id = pm.products_id
       JOIN shop_products_to_style_category sptsc ON sptsc.sptsc_products_id = pm.products_id
       JOIN shop_products_to_shape pts ON pts.products_id = pm.products_id
       WHERE sptst.sptst_stone_type_id = ?
         AND sptsg.sptsg_style_category_id = ?
         AND sptsc.sptsc_style_category_id = ?
         AND pts.shape_id = ?
         AND pm.products_quantity <> 0
         AND pm.product_image_status = 1
       GROUP BY dmt.dmt_id
       ORDER BY dmt.sort_order ASC
      `, [stoneType, design, settingStyle, shape]
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/qualities?stoneType=ID&design=ID&settingStyle=ID&shape=ID&metal=ID
router.get('/qualities', async (req, res) => {
  try {
    const { stoneType, design, settingStyle, shape, metal } = req.query;
    if (!stoneType || !design || !settingStyle || !shape || !metal) return res.json([]);
    const [results] = await pool.query(
      `SELECT dqg.dqg_id AS id, dqg.dqg_name AS name, dqg.dqg_alias, dqg.dqg_origin
       FROM diamond_quality_group dqg
       JOIN shop_products pm ON pm.diamond_quality_id = dqg.dqg_id
       JOIN shop_products_to_stone_type sptst ON sptst.sptst_products_id = pm.products_id
       JOIN shop_products_to_style_group sptsg ON sptsg.sptsg_products_id = pm.products_id
       JOIN shop_products_to_style_category sptsc ON sptsc.sptsc_products_id = pm.products_id
       JOIN shop_products_to_metal_type sptmt ON sptmt.sptmt_products_id = pm.products_id
       JOIN shop_products_to_shape pts ON pts.products_id = pm.products_id
       WHERE sptst.sptst_stone_type_id = ?
         AND sptsg.sptsg_style_category_id = ?
         AND sptsc.sptsc_style_category_id = ?
         AND pts.shape_id = ?
         AND sptmt.sptmt_metal_type_id = ?
         AND pm.products_quantity <> 0
         AND pm.product_image_status = 1
       GROUP BY dqg.dqg_id
       ORDER BY dqg.dqg_sort_order ASC
      `, [stoneType, design, settingStyle, shape, metal]
    );
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/diamond-sizes?stoneType=ID&design=ID&settingStyle=ID&shape=ID&metal=ID&quality=ID
router.get('/diamond-sizesnew', async (req, res) => {
  try {
    const { stoneType, design, settingStyle, shape, metal, quality } = req.query;
    if (!stoneType || !design || !settingStyle || !shape || !metal || !quality) return res.json([]);
    const [results] = await pool.query(
      `SELECT DISTINCT pm.center_stone_weight AS size
       FROM shop_products pm
       JOIN shop_products_to_stone_type sptst ON sptst.sptst_products_id = pm.products_id
       JOIN shop_products_to_style_group sptsg ON sptsg.sptsg_products_id = pm.products_id
       JOIN shop_products_to_style_category sptsc ON sptsc.sptsc_products_id = pm.products_id
       JOIN shop_products_to_metal_type sptmt ON sptmt.sptmt_products_id = pm.products_id
       JOIN shop_products_to_shape pts ON pts.products_id = pm.products_id
       WHERE sptst.sptst_stone_type_id = ?
         AND sptsg.sptsg_style_category_id = ?
         AND sptsc.sptsc_style_category_id = ?
         AND pts.shape_id = ?
         AND sptmt.sptmt_metal_type_id = ?
         AND pm.diamond_quality_id = ?
         AND pm.products_quantity <> 0
         AND pm.product_image_status = 1
       ORDER BY size ASC
      `, [stoneType, design, settingStyle, shape, metal, quality]
    );
    res.json(results.map(r => r.size));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/product?stoneType=ID&design=ID&settingStyle=ID&shape=ID&metal=ID&quality=ID&diamondSize=VAL
router.get('/productnew', async (req, res) => {
  try {
    const { stoneType, design, settingStyle, shape, metal, quality, diamondSize } = req.query;
    // All filters must be present
    if (![stoneType, design, settingStyle, shape, metal, quality, diamondSize].every(Boolean)) return res.json({});
    // SQL
    const sql = `
      SELECT 
        pm.products_id, pm.products_style_no, pm.products_price1, pm.total_carat_weight,
        pd.products_name, pd.products_description,
        pi.image_url AS main_image,
        dqg.dqg_alias, css.dcst_name AS center_stone_name,
        dmt.dmt_name AS metal_name,
        psg.psg_name AS style_group_name,
        psc.psc_name AS style_category_name,
        dsm.name AS diamond_shape_name
      FROM shop_products pm
      LEFT JOIN shop_products_description pd ON pm.products_id = pd.products_id AND pd.language_id = 1
      LEFT JOIN shop_products_image pi ON pm.products_id = pi.products_id AND pi.image_type = 'image'
      LEFT JOIN diamond_quality_group AS dqg ON dqg.dqg_id = pm.diamond_quality_id
      LEFT JOIN diamond_center_stone_type AS css ON pm.center_stone_type_id = css.dcst_id
      LEFT JOIN shop_products_to_style_group sptsg ON pm.products_id = sptsg.sptsg_products_id
      LEFT JOIN shop_products_style_group psg ON sptsg.sptsg_style_category_id = psg.psg_id
      LEFT JOIN shop_products_to_style_category sptsc ON pm.products_id = sptsc.sptsc_products_id
      LEFT JOIN shop_products_style_category psc ON sptsc.sptsc_style_category_id = psc.psc_id
      LEFT JOIN shop_products_to_shape pts ON pm.products_id = pts.products_id
      LEFT JOIN diamond_shape_master dsm ON pts.shape_id = dsm.id
      LEFT JOIN shop_products_to_stone_type sptst ON pm.products_id = sptst.sptst_products_id
      LEFT JOIN shop_products_to_metal_type sptmt ON pm.products_id = sptmt.sptmt_products_id
      LEFT JOIN diamond_metal_type dmt ON sptmt.sptmt_metal_type_id = dmt.dmt_id
      WHERE pm.products_quantity <> 0
        AND pm.product_image_status = 1
        AND pm.center_stone_weight = ?
        AND pm.diamond_quality_id = ?
        AND sptmt.sptmt_metal_type_id = ?
        AND pts.shape_id = ?
        AND sptsc.sptsc_style_category_id = ?
        AND sptsg.sptsg_style_category_id = ?
        AND sptst.sptst_stone_type_id = ?
      ORDER BY pm.products_id DESC
      LIMIT 1
    `;
    const params = [
      diamondSize, // pm.center_stone_weight
      quality,     // pm.diamond_quality_id
      metal,       // sptmt.sptmt_metal_type_id
      shape,       // pts.shape_id
      settingStyle,// sptsc.sptsc_style_category_id
      design,      // sptsg.sptsg_style_category_id
      stoneType    // sptst.sptst_stone_type_id
    ];
    const [results] = await pool.query(sql, params);
    const product = results[0] || {};
    if (!product.products_id) return res.json({});
    // Get images/videos
    const [images] = await pool.query(
      `SELECT image_url, image_type FROM shop_products_image WHERE products_id = ? ORDER BY sort_order ASC`,
      [product.products_id]
    );
    product.images = images.filter(img => img.image_type === 'image').map(img => img.image_url);
    product.videos = images.filter(img => img.image_type === 'video').map(img => img.image_url);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





module.exports = router;
