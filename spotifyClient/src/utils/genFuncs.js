
const shortenString = (str,maxChars=28) =>{

    let retStr=str, addDots = false, limit;

    addDots = maxChars >6 ? true: false ; //  add dots only if we have enough room for 3 more chars 
    limit = maxChars >6 ? maxChars -3 : maxChars; // take dots into account 

    if (str.length > limit)
    {
        retStr = str.slice(0, limit);   
    }
    else // we did not cut the string ...
    {
        addDots = false;
    }

    if ( addDots) 
    {
        retStr += "...";    
    }
    return (retStr);
}

const isMobile = () => 
{
  return window.matchMedia("(max-width: 767px)").matches;
}

export { shortenString, isMobile }