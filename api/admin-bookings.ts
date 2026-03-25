import { netlifyHandlerToVercel } from "./_vercelAdapter";
import { handler } from "../netlify/functions/admin-bookings";

export default netlifyHandlerToVercel(handler);
