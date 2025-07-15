import { createSafeActionClient } from 'next-safe-action'
import { z } from 'zod'
import * as Sentry from '@sentry/nextjs'

export const actionClient = createSafeActionClient({
    defineMetadataSchema() {
        return z.object({
            actionName: z.string(),
        })
    },
    handleServerError(e, utils) {
      console.log(e.constructor.name);
        const { clientInput, metadata } = utils
        Sentry.captureException(e, (scope) => {
            scope.clear()
            scope.setContext('serverError', { message: e.message })
            scope.setContext('metadata', { actionName: metadata?.actionName })
            scope.setContext('clientInput', { clientInput })
            return scope
        })
      if (e.constructor.name === "DrizzleQueryError") {
        let message = "Failed to execute request";

        const cause = typeof e.cause === "object" && e.cause !== null
          ? e.cause as { constraint?: string }
          : undefined;

        if (cause?.constraint === "customers_phone_unique") {
          message = "Phone number already exists";
        } else if (cause?.constraint === "customers_email_unique") {
          message = "Email address already exists";
        }

        return `Database Error: ${message}`;
      }

    return e instanceof Error ? e.message : "Unexpected server error.";
  }
})