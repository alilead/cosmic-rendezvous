import { netlifyHandlerToVercel } from "./_vercelAdapter";
import { handler } from "../server/leaderboard";

export default netlifyHandlerToVercel(handler);
