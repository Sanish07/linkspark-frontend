import { subdomainList } from "./access_list";

export const resolveSubdomain = () => {
    const subdomain = getSubdomain(window.location.hostname);

    const mainApp = subdomainList.find((app) => app.main);
    if (subdomain === "") return mainApp.app;

    const apps = subdomainList.find((app) => subdomain === app.subdomain);

    return apps ? apps.app : mainApp.app;
};

//2 cases: 1. url.linkspark.com, 2. url.localhost
export const getSubdomain = (location) => {
    const locationParts = location.split(".");
    const isLocalhost = locationParts.slice(-1)[0] === "localhost";
    const sliceTill = isLocalhost ? -1 : -2;
    return locationParts.slice(0, sliceTill).join("");
} 