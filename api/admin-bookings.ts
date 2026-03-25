import { netlifyHandlerToVercel } from "./_vercelAdapter";
import { handler } from "../server/admin-bookings";

export default netlifyHandlerToVercel(handler);
