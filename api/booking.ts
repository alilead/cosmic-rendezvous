import { netlifyHandlerToVercel } from "./_vercelAdapter";
import { handler } from "../server/booking";

export default netlifyHandlerToVercel(handler);
