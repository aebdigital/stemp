import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  ghost?: ReactNode;
  className?: string;
};

type LinkProps = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children"> & {
    href: ComponentPropsWithoutRef<typeof Link>["href"];
  };

type AnchorProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, "className" | "children" | "href"> & {
    href: string;
    external: true;
  };

type ButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: undefined;
  };

function Inner({ main, ghost }: { main: ReactNode; ghost: ReactNode }) {
  return (
    <span className="btn-roll-inner">
      <span className="btn-roll-text btn-roll-text--main">{main}</span>
      <span className="btn-roll-text btn-roll-text--ghost" aria-hidden>
        {ghost}
      </span>
    </span>
  );
}

export default function RollButton(
  props: LinkProps | AnchorProps | ButtonProps,
) {
  const { children, ghost, className = "", ...rest } = props as CommonProps & {
    href?: unknown;
    external?: boolean;
  };
  const display = ghost ?? children;

  if ("external" in rest && rest.external && typeof rest.href === "string") {
    const { external: _e, href, ...anchorRest } =
      rest as AnchorProps & { external: boolean };
    return (
      <a
        href={href}
        className={`btn-roll ${className}`}
        target="_blank"
        rel="noopener noreferrer"
        {...anchorRest}
      >
        <Inner main={children} ghost={display} />
      </a>
    );
  }

  if ("href" in rest && rest.href) {
    const { href, ...linkRest } = rest as LinkProps;
    return (
      <Link href={href} className={`btn-roll ${className}`} {...linkRest}>
        <Inner main={children} ghost={display} />
      </Link>
    );
  }

  const buttonRest = rest as ButtonProps;
  return (
    <button
      type={buttonRest.type ?? "button"}
      className={`btn-roll ${className}`}
      {...buttonRest}
    >
      <Inner main={children} ghost={display} />
    </button>
  );
}
