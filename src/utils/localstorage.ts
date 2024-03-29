export const saveToLocalStorage = (weather:string) => {
    let favorites:string[] = getLocalStorage();

    if(!favorites.includes(weather)){
        favorites.push(weather);
    }

    localStorage.setItem("Favorite Weather", JSON.stringify(favorites));
}

export const getLocalStorage = () => {
    let localStorageData = localStorage.getItem("Favorite Weather");

    if(localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);

}

export const removeFromLocalStorage = (weather:string) => {
    let favorites:string[] = getLocalStorage();

    let namedIndex:number = favorites.indexOf(weather);

    favorites.splice(namedIndex, 1);

    localStorage.setItem("Favorite Weather", JSON.stringify(favorites));

}