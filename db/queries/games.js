import db from "#db/client";

export async function createGame({title, genre, release_year, platform_id}) {
    const sql = `
    INSERT INTO games (title, genre, release_year, platform_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;
    const { rows: [game], } = await db.query(sql, [title, genre, release_year, platform_id]);
    return game;
}
