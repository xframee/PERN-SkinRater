const pool = require("../db");

const getAllSkins = async (req, res) => {
  try {
    const filter = req.query.filter ?? 'all';
    const sort = req.query.sort ?? 'desc';
    const page = Math.max(parseInt(req.query.page ?? '1', 10), 1);
    const limit = Math.max(parseInt(req.query.limit ?? '10', 10), 1);
    const offset = (page - 1) * limit;

    let whereClause = '';
    let orderClause = '';
    const queryParams = [];

    if (filter === 'best') {
      whereClause = 'WHERE average_rating IS NOT NULL';
      orderClause = `ORDER BY average_rating ${sort.toUpperCase()}`;
    } else if (filter === 'newest') {
      orderClause = `ORDER BY skin_id ${sort}`;
    } else {
      orderClause = `ORDER BY skin_id`;
    }

    const baseQuery = `SELECT * FROM skin_info ${whereClause} ${orderClause} LIMIT $1 OFFSET $2`;
    const countQuery = `SELECT COUNT(*) FROM skin_info ${whereClause}`;
    queryParams.push(limit, offset);

    const [{ count }] = (await pool.query(countQuery)).rows;
    const { rows } = await pool.query(baseQuery, queryParams);

    res.json({
      data: rows,
      totalItems: Number(count),
      page,
      pageSize: limit,
      totalPages: Math.ceil(count / limit),
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


const getSkinById = async (req, res) => {
  try {
    const { id } = req.params;
    const skin = await pool.query("SELECT * FROM skin_info WHERE skin_id = $1", [id]);
    res.json(skin.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const rateSkin = async (req, res) => {
  try {
    const { skin_id, rating } = req.body;
    const user_id = req.user.user_id;

    if (!skin_id || !rating || rating < 1 || rating > 10) {
      return res.status(400).json({ error: "Invalid input: Skin ID and rating (1-10) are required" });
    }

    await pool.query("SELECT rate_skin($1, $2, $3)", [user_id, skin_id, rating]);

    res.json({ message: "Rating submitted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllSkins,
  getSkinById,
  rateSkin,
};
