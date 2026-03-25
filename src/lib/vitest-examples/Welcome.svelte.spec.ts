import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-svelte";
import Welcome from "./Welcome.svelte";

describe("Welcome.svelte", () => {
  it("renders greetings for host and guest", () => {
    const { container } = render(Welcome, {
      host: "SvelteKit",
      guest: "Vitest",
    });

    const heading = container.querySelector("h1");
    expect(heading).toBeTruthy();
    expect(heading?.textContent).toBe("Hello, SvelteKit!");

    const text = container.querySelector("p");
    expect(text).toBeTruthy();
    expect(text?.textContent).toBe("Hello, Vitest!");
  });
});
