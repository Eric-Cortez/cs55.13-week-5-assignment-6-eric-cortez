import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

function readPostsJson() {
    const filePath = path.join(dataDir, 'posts.json');
    const jsonString = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonString);
}

export function getSortedPostsData() {
    const jsonObj = readPostsJson();
    jsonObj.sort(function (a, b) {
        return a.title.localeCompare(b.title);
    });
    return jsonObj.map(item => {
        return {
            id: item.id.toString(),
            title: item.title,
            date: item.date,
            author: item.author,
        }
    });
}

export function getAllPostIds() {
    const jsonObj = readPostsJson();
    return jsonObj.map(item => {
        return {
            params: {
                id: item.id.toString()
            }
        }
    });
}

export function getPostData(id) {
    const jsonObj = readPostsJson();
    const objReturned = jsonObj.filter(obj => {
        return obj.id.toString() === id;
    });
    if (objReturned.length === 0) {
        return {
            id: id,
            title: 'Not found',
            date: '',
            contentHtml: 'Not found'
        }
    } else {
        return objReturned[0];
    }
}