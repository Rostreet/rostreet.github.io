import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Photo } from "./types";

export type { Photo };

const photosDirectory = path.join(process.cwd(), "content/photos");

export function getPhoto(id: string): Photo | undefined {
	try {
		const fullPath = path.join(photosDirectory, `${id}.md`);
		const fileContents = fs.readFileSync(fullPath, "utf8");
		const { data } = matter(fileContents);

		// 处理日期：gray-matter 可能将日期解析为 Date 对象
		const formatDate = (date: string | Date): string => {
			if (date instanceof Date) {
				return date.toISOString().split("T")[0];
			}
			return String(date);
		};

		return {
			id,
			src: data.src,
			title: data.title,
			location: data.location,
			date: formatDate(data.date),
			description: data.description,
			camera: data.camera,
			lens: data.lens,
			height: data.height || 300,
		};
	} catch {
		return undefined;
	}
}

export function getAllPhotoIds(): string[] {
	try {
		const fileNames = fs.readdirSync(photosDirectory);
		return fileNames
			.filter((fileName) => fileName.endsWith(".md"))
			.map((fileName) => fileName.replace(/\.md$/, ""));
	} catch {
		return [];
	}
}

export function getAllPhotos(): Photo[] {
	const ids = getAllPhotoIds();
	const photos = ids
		.map((id) => getPhoto(id))
		.filter((photo): photo is Photo => photo !== undefined)
		.sort((a, b) => (a.date > b.date ? -1 : 1));

	return photos;
}

export function getPhotosByLocation(location: string): Photo[] {
	return getAllPhotos().filter((photo) => photo.location === location);
}

export function getAllLocations(): string[] {
	const photos = getAllPhotos();
	const locations = new Set(photos.map((photo) => photo.location));
	return Array.from(locations);
}
