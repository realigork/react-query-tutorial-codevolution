# React Query Tutorial by Codevolution

**Link on YouTube:**
https://www.youtube.com/watch?v=VtWkSCZX0Ec&list=PLC3y8-rFHvwjTELCrPrcZlo6blLBUspd2&index=1&pp=iAQB

## How to run

1. Install dependencies: `npm install`
2. Start JSON server: `npm run serve-json`
3. In a separate window start dev server `npm start`

The above commands could be run with yarn.

JSON server is available via `localhost:4000`;
DEV server is available via `localhost:3000`;

## Purpose

React Query is an incredible library that helps you fetch JSON data from the server while exposing helpful flags such as `isLoading`, `isFetching`, `isError` out of the box.

It also provides helpful Devtools to watch the queries that are being run.

Every query has an internal cache that is set to 5min meaning that running the same query would render data on the UI right away while still fetching the data in the background to ensure data is still the same. If data has changed then the UI will be updated too.

Reducing `cacheTime` would remove the query from the cache after the specified time and so it would run again.

See the code in two different components `SuperHeroes.page.js` and `RQSuperHeroes.page.js` to compare the difference between writing the code from scratch and using useEffect hook to set loading flag, to set the data etc. And then see how React Query exposes those flags for you reducing number of lines of code that you need to write.

### Example

**Installation**

Import ReactQueryProvider and ReactQuery on the global level and wrap your entire App with the provider

```js
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
    );
}
```

Create a React component and add a function that returns a fetch request. Then use it as a callback in the `useQuery` hook. The first argument is the name of the query that will be used by React Query and you would be able to trace it via ReactQueryDevttols

```js
import { useQuery } from "react-query";

const fetchSuperHeroes = () => {
    return axios.get("http://localhost:4000/superheroes");
};

function SuperHeroesPage() {
    const { isLoading, data, isError, error, isFetching } = useQuery(
        "super-heroes",
        fetchSuperHeroes,
        {
            cacheTime: 5000,
        }
    );

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
}
```
