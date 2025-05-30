import db from "#db/client";

export async function createPlatform({name, manufacturer}) {
    const sql = `
    INSERT INTO platforms (name, manufacturer)
    VALUES ($1, $2)
    RETURNING *
    `;
    const { rows: [platform], } = await db.query(sql,[name, manufacturer]);
    return platform;
}

export async function getPlatforms(){
    const sql = `
    SELECT *
    FROM platforms
    `;
    const {rows: platform} = await db.query(sql);
    return platform
}
