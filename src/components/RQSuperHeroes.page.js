import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroesAxios = () => {
    return axios.get("http://localhost:4000/superheroes");
};

// const fetchSuperHeroes = () => {
//     return fetch("http://localhost:4000/superheroes").then((res) => res.json());
// };

export const RQSuperHeroesPage = () => {
    const { isLoading, data, isError, error, isFetching } = useQuery(
        "super-heroes",
        fetchSuperHeroesAxios,
        {
            cacheTime: 5000,
        }
    );

    console.log({ isLoading, isFetching });

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    if (isError) {
        return <h2>{error.message}</h2>;
    }

    return (
        <>
            <h2>RQ Super Heroes Page</h2>
            {data?.data.map((hero) => {
                return <div key={hero.name}>{hero.name}</div>;
            })}
        </>
    );
};
