import { prisma } from "@/db";


export async function createMovieModel(_name: string, _releaseDate: string, _imageURL: string) {
    const movie = await prisma.movie.create({
        data: {
            name: _name,
            releaseDate: _releaseDate,
            imageURL: _imageURL
        }
    });

    return movie
}

//Procurar filmes pelo nome
export async function findMovieByNameModel(_name: string) {
    const movie = await prisma.movie.findUnique({
        where: {
            name: _name
        },
        include: {
            retings:true
        }
    });

    return movie
}


export async function selectMoviesModel() {
    const movies = await prisma.movie.findMany();

    return movies;
}