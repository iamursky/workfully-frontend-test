import type { FormEvent } from "react";

import { SearchIcon } from "@primer/octicons-react";
import { Button, FormControl, TextInput } from "@primer/react";
import { useCallback } from "react";

export interface IGitHubUserSearchFormProps {
  defaultValue?: string;
  onSubmit: (username: string) => void;
}

export function GitHubUserSearchForm({ defaultValue = "", onSubmit }: IGitHubUserSearchFormProps) {
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const username = formData.get("username") as string;

      onSubmit(username);
    },
    [onSubmit],
  );

  return (
    <form className="w-full" onSubmit={handleSubmit} data-cy="github-user-search-form">
      <FormControl>
        <FormControl.Label htmlFor="github-username-input">GitHub Username</FormControl.Label>
        <div className="w-full flex gap-2">
          <TextInput
            name="username"
            defaultValue={defaultValue}
            leadingVisual={SearchIcon}
            placeholder="Enter GitHub username..."
            aria-label="Enter GitHub username..."
            autoComplete="off"
            className="flex-1"
            data-cy="github-user-search-form__username-input"
          />

          <Button type="submit" data-cy="github-user-search-form__submit-button">
            Search
          </Button>
        </div>
      </FormControl>
    </form>
  );
}
