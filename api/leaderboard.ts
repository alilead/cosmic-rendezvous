import { netlifyHandlerToVercel } from "./_vercelAdapter";
import { handler } from "../netlify/functions/leaderboard";

export default netlifyHandlerToVercel(handler);
