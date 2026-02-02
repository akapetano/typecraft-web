import { css } from "styled-system/css";
import { Box } from "styled-system/jsx";

export function GradientShowcase() {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "8",
      })}
    >
      <header
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "1",
        })}
      >
        <h2 className={css({ fontSize: "xl", fontWeight: "semibold" })}>
          Gradient Showcase
        </h2>
        <p className={css({ color: "fg.muted", fontSize: "sm" })}>
          Semantic gradient tokens (mint + violet) and inline gradient
          utilities.
        </p>
      </header>

      {/* Section 1: Semantic gradient tokens — bgGradient / textGradient by name */}
      <section
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "4",
        })}
      >
        <h3 className={css({ fontSize: "lg", fontWeight: "medium" })}>
          Semantic gradient tokens
        </h3>
        <p className={css({ color: "fg.muted", fontSize: "sm" })}>
          Same gradients as semantic tokens (brand, brandSoft, brandSubtle),
          rendered with inline{" "}
          <code className={css({ px: "1", rounded: "sm", bg: "gray.3" })}>
            bgLinear
          </code>{" "}
          + color stops so they display correctly; mint/violet respect
          light/dark mode.
        </p>
        <div
          className={css({
            display: "grid",
            gap: "4",
            gridTemplateColumns: { base: "1fr", md: "repeat(3, 1fr)" },
          })}
        >
          <Card title={'Brand (token: "brand")'}>
            <div
              className={css({
                display: "flex",
                flexDirection: "column",
                gap: "4",
              })}
            >
              <Box
                h="20"
                w="full"
                borderRadius="l2"
                bg="gray.3"
                bgLinear="to-r"
                gradientFrom="mint.9"
                gradientTo="violet.9"
              />
              <div
                className={css({
                  bgLinear: "to-r",
                  gradientFrom: "mint.9",
                  gradientTo: "violet.9",
                  backgroundClip: "text",
                  color: "transparent",
                  fontSize: "2xl",
                  fontWeight: "bold",
                })}
              >
                Typecraft
              </div>
            </div>
          </Card>
          <Card title={'Brand Soft (token: "brandSoft")'}>
            <div
              className={css({
                display: "flex",
                flexDirection: "column",
                gap: "4",
              })}
            >
              <Box
                h="20"
                w="full"
                borderRadius="l2"
                bg="gray.3"
                bgLinear="to-br"
                gradientFrom="mint.8"
                gradientVia="violet.8"
                gradientTo="mint.9"
              />
              <div
                className={css({
                  bgLinear: "to-br",
                  gradientFrom: "mint.8",
                  gradientVia: "violet.8",
                  gradientTo: "mint.9",
                  backgroundClip: "text",
                  color: "transparent",
                  fontSize: "2xl",
                  fontWeight: "bold",
                })}
              >
                Typecraft
              </div>
            </div>
          </Card>
          <Card title={'Brand Subtle (token: "brandSubtle")'}>
            <div
              className={css({
                display: "flex",
                flexDirection: "column",
                gap: "4",
              })}
            >
              <Box
                h="20"
                w="full"
                borderRadius="l2"
                bg="gray.3"
                bgGradient="brand"
              />
              <div
                className={css({
                  bgLinear: "to-r",
                  gradientFrom: "mint.4",
                  gradientTo: "violet.4",
                  backgroundClip: "text",
                  color: "transparent",
                  fontSize: "2xl",
                  fontWeight: "bold",
                })}
              >
                Typecraft
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Section 2: Inline gradients — bgLinear + gradientFrom/To/Via */}
      <section
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: "4",
        })}
      >
        <h3 className={css({ fontSize: "lg", fontWeight: "medium" })}>
          Inline gradients
        </h3>
        <p className={css({ color: "fg.muted", fontSize: "sm" })}>
          Use{" "}
          <code className={css({ px: "1", rounded: "sm", bg: "gray.3" })}>
            bgLinear
          </code>{" "}
          +{" "}
          <code className={css({ px: "1", rounded: "sm", bg: "gray.3" })}>
            gradientFrom
          </code>{" "}
          /{" "}
          <code className={css({ px: "1", rounded: "sm", bg: "gray.3" })}>
            gradientTo
          </code>{" "}
          (and optional{" "}
          <code className={css({ px: "1", rounded: "sm", bg: "gray.3" })}>
            gradientVia
          </code>
          ) for one-off gradients.
        </p>
        <div
          className={css({
            display: "grid",
            gap: "4",
            gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" },
          })}
        >
          <Card title="Box: bgLinear to-bl, mint.9 → violet.9">
            <Box
              h="20"
              w="full"
              borderRadius="l2"
              bg="gray.3"
              bgLinear="to-bl"
              gradientFrom="mint.9"
              gradientTo="violet.9"
            />
          </Card>
          <Card title="css(): same gradient">
            <div
              className={css({
                height: "20",
                width: "full",
                borderRadius: "l2",
                bg: "gray.3",
                bgLinear: "to-bl",
                gradientFrom: "mint.9",
                gradientTo: "violet.9",
              })}
            />
          </Card>
          <Card title="Box: with gradientVia">
            <Box
              h="20"
              w="full"
              borderRadius="l2"
              bg="gray.3"
              bgLinear="to-r"
              gradientFrom="mint.9"
              gradientVia="mint.11"
              gradientTo="violet.9"
            />
          </Card>
          <Card title="Text: bgLinear + gradient stops (text clip)">
            <div
              className={css({
                bgLinear: "to-r",
                gradientFrom: "mint.9",
                gradientTo: "violet.9",
                backgroundClip: "text",
                color: "transparent",
                fontSize: "2xl",
                fontWeight: "bold",
              })}
            >
              Typecraft
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={css({
        borderRadius: "l2",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "border",
        overflow: "hidden",
        bg: "bg.default",
      })}
    >
      <div
        className={css({
          p: "3",
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderColor: "border",
        })}
      >
        <code className={css({ fontSize: "xs", color: "fg.muted" })}>
          {title}
        </code>
      </div>
      <div className={css({ p: "3" })}>{children}</div>
    </div>
  );
}
