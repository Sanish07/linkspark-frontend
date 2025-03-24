import AppRouter, { SubdomainRouter } from "../AppRouter";

export const subdomainList = [
    {subdomain : "www", app : AppRouter, main : true},
    {subdomain : "url", app : SubdomainRouter, main : false}
];