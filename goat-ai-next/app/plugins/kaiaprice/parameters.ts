import { createToolParameters } from "@goat-sdk/core";
import { z } from "zod";

export class GetKaiaPriceParameters extends createToolParameters(
    z.object({})
) {}