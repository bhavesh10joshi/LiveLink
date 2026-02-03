import { v4 as uuidv4 } from "uuid";

export function UniqueId()
{
    const uniqueString = uuidv4();
    return uniqueString;
}

