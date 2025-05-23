import express from "express";
import db from "../db/connect.js";

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { id, report_desc, user_id, listing_id } = req.body;
    const existingReport = await db.query(
      'SELECT * FROM reports WHERE user_id = $1 AND listing_id = $2',
      [user_id, listing_id]
    );
    if (existingReport.rows.length > 0) {
      const updatedReport = await db.query(
        'UPDATE reports SET times_reported = times_reported + 1, report_time = CURRENT_TIMESTAMP, report_desc = $1 WHERE user_id = $2 AND listing_id = $3 RETURNING *',
        [report_desc, user_id, listing_id]
      );
      
      return res.status(200).json(updatedReport.rows[0]);
    }
    
    const newReport = await db.query(
      'INSERT INTO reports (id, report_desc, times_reported, report_time, user_id, listing_id) VALUES ($1, $2, 1, CURRENT_TIMESTAMP, $3, $4) RETURNING *',
      [id || uuidv4(), report_desc, user_id, listing_id]
    );
    
    res.status(201).json(newReport.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', async (req, res) => {
  try {
    const allReports = await db.query('SELECT * FROM reports ORDER BY report_time DESC');
    res.json(allReports.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/listing/:listing_id', async (req, res) => {
  try {
    const { listing_id } = req.params;
    const listingReports = await db.query(
      'SELECT * FROM reports WHERE listing_id = $1 ORDER BY report_time DESC',
      [listing_id]
    );
    res.json(listingReports.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/user/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const userReports = await db.query(
      'SELECT * FROM reports WHERE user_id = $1 ORDER BY report_time DESC',
      [user_id]
    );
    res.json(userReports.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteReport = await db.query('DELETE FROM reports WHERE id = $1 RETURNING *', [id]);
    
    if (deleteReport.rows.length === 0) {
      return res.status(404).json({ message: "Report not found" });
    }
    
    res.json({ message: "Report deleted successfully" });
  } catch (err) {
    res.status(404).json({err})
  }
});
export default router;