import { netlifyHandlerToVercel } from "./_vercelAdapter";
import { handler } from "../netlify/functions/booking";

export default netlifyHandlerToVercel(handler);
