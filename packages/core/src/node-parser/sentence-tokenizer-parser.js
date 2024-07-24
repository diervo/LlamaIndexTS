var __getOwnPropNames = Object.getOwnPropertyNames;
var cjs = (cb, mod) =>
  function _r() {
    return (
      mod ||
        (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    );
  };

// lib/natural/util/abbreviations_en.js
var require_abbreviations_en = cjs({
  "lib/natural/util/abbreviations_en.js"(exports) {
    "use strict";
    var knownAbbreviations = [
      "approx.",
      "appt.",
      "apt.",
      "A.S.A.P.",
      "B.Y.O.B.",
      "c/o",
      "dept.",
      "D.I.Y.",
      "est.",
      "E.T.A.",
      "Inc.",
      "min.",
      "misc.",
      "Mr.",
      "Mrs.",
      "no.",
      "R.S.V.P.",
      "tel.",
      "temp.",
      "vet.",
      "vs.",
    ];
    exports.knownAbbreviations = knownAbbreviations;
  },
});

// lib/natural/tokenizers/parser_sentence_tokenizer.js
var require_parser_sentence_tokenizer = cjs({
  "lib/natural/tokenizers/parser_sentence_tokenizer.js"(exports, module) {
    "use strict";
    function peg$subclass(child, parent) {
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
    }
    function peg$SyntaxError(message, expected, found, location) {
      this.message = message;
      this.expected = expected;
      this.found = found;
      this.location = location;
      this.name = "SyntaxError";
      if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, peg$SyntaxError);
      }
    }
    peg$subclass(peg$SyntaxError, Error);
    peg$SyntaxError.buildMessage = function (expected, found) {
      var DESCRIBE_EXPECTATION_FNS = {
        literal: function (expectation) {
          return '"' + literalEscape(expectation.text) + '"';
        },
        class: function (expectation) {
          var escapedParts = "",
            i;
          for (i = 0; i < expectation.parts.length; i++) {
            escapedParts +=
              expectation.parts[i] instanceof Array
                ? classEscape(expectation.parts[i][0]) +
                  "-" +
                  classEscape(expectation.parts[i][1])
                : classEscape(expectation.parts[i]);
          }
          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },
        any: function (expectation) {
          return "any character";
        },
        end: function (expectation) {
          return "end of input";
        },
        other: function (expectation) {
          return expectation.description;
        },
      };
      function hex(ch) {
        return ch.charCodeAt(0).toString(16).toUpperCase();
      }
      function literalEscape(s) {
        return s
          .replace(/\\/g, "\\\\")
          .replace(/"/g, '\\"')
          .replace(/\0/g, "\\0")
          .replace(/\t/g, "\\t")
          .replace(/\n/g, "\\n")
          .replace(/\r/g, "\\r")
          .replace(/[\x00-\x0F]/g, function (ch) {
            return "\\x0" + hex(ch);
          })
          .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
            return "\\x" + hex(ch);
          });
      }
      function classEscape(s) {
        return s
          .replace(/\\/g, "\\\\")
          .replace(/\]/g, "\\]")
          .replace(/\^/g, "\\^")
          .replace(/-/g, "\\-")
          .replace(/\0/g, "\\0")
          .replace(/\t/g, "\\t")
          .replace(/\n/g, "\\n")
          .replace(/\r/g, "\\r")
          .replace(/[\x00-\x0F]/g, function (ch) {
            return "\\x0" + hex(ch);
          })
          .replace(/[\x10-\x1F\x7F-\x9F]/g, function (ch) {
            return "\\x" + hex(ch);
          });
      }
      function describeExpectation(expectation) {
        return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
      }
      function describeExpected(expected2) {
        var descriptions = new Array(expected2.length),
          i,
          j;
        for (i = 0; i < expected2.length; i++) {
          descriptions[i] = describeExpectation(expected2[i]);
        }
        descriptions.sort();
        if (descriptions.length > 0) {
          for (i = 1, j = 1; i < descriptions.length; i++) {
            if (descriptions[i - 1] !== descriptions[i]) {
              descriptions[j] = descriptions[i];
              j++;
            }
          }
          descriptions.length = j;
        }
        switch (descriptions.length) {
          case 1:
            return descriptions[0];
          case 2:
            return descriptions[0] + " or " + descriptions[1];
          default:
            return (
              descriptions.slice(0, -1).join(", ") +
              ", or " +
              descriptions[descriptions.length - 1]
            );
        }
      }
      function describeFound(found2) {
        return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
      }
      return (
        "Expected " +
        describeExpected(expected) +
        " but " +
        describeFound(found) +
        " found."
      );
    };
    function peg$parse(input, options) {
      options = options !== void 0 ? options : {};
      var peg$FAILED = {},
        peg$startRuleFunctions = { s: peg$parses },
        peg$startRuleFunction = peg$parses,
        peg$c0 = function (sentences) {
          const result = [];
          sentences.forEach((sent0) => {
            sent0[0].forEach((sent1) => {
              result.push(sent1);
            });
          });
          return result;
        },
        peg$c1 = function (sentences) {
          return sentences.map((sent) => {
            sent[0].push(sent[1]);
            return sent[0].reduce((accu, str) => accu + str).trim();
          });
        },
        peg$c2 = function (open, sentences, close) {
          const result = sentences.map((sent) => {
            sent[0].push(sent[1]);
            return sent[0].reduce((accu, str) => accu + str).trim();
          });
          result.unshift(open);
          if (close) {
            result.push(close);
          }
          return result;
        },
        peg$c3 = function (seqs, end) {
          const res = seqs.reduce((accu, seq) => accu.concat(seq));
          res.push(end);
          return res;
        },
        peg$c4 = function (tokens) {
          const result = tokens.map((pair) => pair[0] + pair[1]);
          return result;
        },
        peg$c5 = function (open, tokens, end, close) {
          const result = tokens.map((pair) => pair[0] + pair[1]);
          result.unshift(open);
          result.push(end);
          result.push(close);
          return result;
        },
        peg$c6 = /^[ \t\n\r.?!]/,
        peg$c7 = peg$classExpectation(
          [" ", "	", "\n", "\r", ".", "?", "!"],
          false,
          false,
        ),
        peg$c8 = function () {
          return text();
        },
        peg$c9 = /^[ \t\n\r]/,
        peg$c10 = peg$classExpectation([" ", "	", "\n", "\r"], false, false),
        peg$c11 = function (t) {
          return t;
        },
        peg$c12 = /^[^ \t\n\r!?([}"`)\]}"`0-9@]/,
        peg$c13 = peg$classExpectation(
          [
            " ",
            "	",
            "\n",
            "\r",
            "!",
            "?",
            "(",
            "[",
            "}",
            '"',
            "`",
            ")",
            "]",
            "}",
            '"',
            "`",
            ["0", "9"],
            "@",
          ],
          true,
          false,
        ),
        peg$c14 = function (word) {
          const tmp = word.reduce((accu, elt) => accu + elt);
          return knownAbbreviations.indexOf(tmp) > -1;
        },
        peg$c15 = function (word) {
          return text();
        },
        peg$c16 = /^[^ \t\n\r!?.([})\]}`"0-9@]/,
        peg$c17 = peg$classExpectation(
          [
            " ",
            "	",
            "\n",
            "\r",
            "!",
            "?",
            ".",
            "(",
            "[",
            "}",
            ")",
            "]",
            "}",
            "`",
            '"',
            ["0", "9"],
            "@",
          ],
          true,
          false,
        ),
        peg$c18 = function () {
          return text();
        },
        peg$c19 = /^[0-9]/,
        peg$c20 = peg$classExpectation([["0", "9"]], false, false),
        peg$c21 = peg$anyExpectation(),
        peg$c22 = /^[a-z]/,
        peg$c23 = peg$classExpectation([["a", "z"]], false, false),
        peg$c24 = /^[@]/,
        peg$c25 = peg$classExpectation(["@"], false, false),
        peg$c26 = /^[.]/,
        peg$c27 = peg$classExpectation(["."], false, false),
        peg$c28 = "http://",
        peg$c29 = peg$literalExpectation("http://", false),
        peg$c30 = "https://",
        peg$c31 = peg$literalExpectation("https://", false),
        peg$c32 = /^[a-z0-9]/,
        peg$c33 = peg$classExpectation(
          [
            ["a", "z"],
            ["0", "9"],
          ],
          false,
          false,
        ),
        peg$c34 = /^[\/]/,
        peg$c35 = peg$classExpectation(["/"], false, false),
        peg$c36 = function () {
          return text();
        },
        peg$c37 = /^[([{"'`\u2018]/,
        peg$c38 = peg$classExpectation(
          ["(", "[", "{", '"', "'", "`", "\u2018"],
          false,
          false,
        ),
        peg$c39 = /^[)\]}"'`\u2019]/,
        peg$c40 = peg$classExpectation(
          [")", "]", "}", '"', "'", "`", "\u2019"],
          false,
          false,
        ),
        peg$currPos = 0,
        peg$savedPos = 0,
        peg$posDetailsCache = [{ line: 1, column: 1 }],
        peg$maxFailPos = 0,
        peg$maxFailExpected = [],
        peg$silentFails = 0,
        peg$result;
      if ("startRule" in options) {
        if (!(options.startRule in peg$startRuleFunctions)) {
          throw new Error(
            `Can't start parsing from rule "` + options.startRule + '".',
          );
        }
        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
      }
      function text() {
        return input.substring(peg$savedPos, peg$currPos);
      }
      function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
      }
      function expected(description, location2) {
        location2 =
          location2 !== void 0
            ? location2
            : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildStructuredError(
          [peg$otherExpectation(description)],
          input.substring(peg$savedPos, peg$currPos),
          location2,
        );
      }
      function error(message, location2) {
        location2 =
          location2 !== void 0
            ? location2
            : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildSimpleError(message, location2);
      }
      function peg$literalExpectation(text2, ignoreCase) {
        return { type: "literal", text: text2, ignoreCase };
      }
      function peg$classExpectation(parts, inverted, ignoreCase) {
        return { type: "class", parts, inverted, ignoreCase };
      }
      function peg$anyExpectation() {
        return { type: "any" };
      }
      function peg$endExpectation() {
        return { type: "end" };
      }
      function peg$otherExpectation(description) {
        return { type: "other", description };
      }
      function peg$computePosDetails(pos) {
        var details = peg$posDetailsCache[pos],
          p;
        if (details) {
          return details;
        } else {
          p = pos - 1;
          while (!peg$posDetailsCache[p]) {
            p--;
          }
          details = peg$posDetailsCache[p];
          details = {
            line: details.line,
            column: details.column,
          };
          while (p < pos) {
            if (input.charCodeAt(p) === 10) {
              details.line++;
              details.column = 1;
            } else {
              details.column++;
            }
            p++;
          }
          peg$posDetailsCache[pos] = details;
          return details;
        }
      }
      function peg$computeLocation(startPos, endPos) {
        var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails = peg$computePosDetails(endPos);
        return {
          start: {
            offset: startPos,
            line: startPosDetails.line,
            column: startPosDetails.column,
          },
          end: {
            offset: endPos,
            line: endPosDetails.line,
            column: endPosDetails.column,
          },
        };
      }
      function peg$fail(expected2) {
        if (peg$currPos < peg$maxFailPos) {
          return;
        }
        if (peg$currPos > peg$maxFailPos) {
          peg$maxFailPos = peg$currPos;
          peg$maxFailExpected = [];
        }
        peg$maxFailExpected.push(expected2);
      }
      function peg$buildSimpleError(message, location2) {
        return new peg$SyntaxError(message, null, null, location2);
      }
      function peg$buildStructuredError(expected2, found, location2) {
        return new peg$SyntaxError(
          peg$SyntaxError.buildMessage(expected2, found),
          expected2,
          found,
          location2,
        );
      }
      function peg$parses() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$parseSentences();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseWhitespace();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 === peg$FAILED) {
          s2 = peg$currPos;
          s3 = peg$parseQuotedSentences();
          if (s3 !== peg$FAILED) {
            s4 = peg$parseWhitespace();
            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$currPos;
            s3 = peg$parseSentences();
            if (s3 !== peg$FAILED) {
              s4 = peg$parseWhitespace();
              if (s4 !== peg$FAILED) {
                s3 = [s3, s4];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
            if (s2 === peg$FAILED) {
              s2 = peg$currPos;
              s3 = peg$parseQuotedSentences();
              if (s3 !== peg$FAILED) {
                s4 = peg$parseWhitespace();
                if (s4 !== peg$FAILED) {
                  s3 = [s3, s4];
                  s2 = s3;
                } else {
                  peg$currPos = s2;
                  s2 = peg$FAILED;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c0(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parseSentences() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$parseSentence();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseWhitespace();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$currPos;
            s3 = peg$parseSentence();
            if (s3 !== peg$FAILED) {
              s4 = peg$parseWhitespace();
              if (s4 !== peg$FAILED) {
                s3 = [s3, s4];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c1(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parseQuotedSentences() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parseOpenSymbol();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parseSentence();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseWhitespace();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$currPos;
              s4 = peg$parseSentence();
              if (s4 !== peg$FAILED) {
                s5 = peg$parseWhitespace();
                if (s5 !== peg$FAILED) {
                  s4 = [s4, s5];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            }
          } else {
            s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parseCloseSymbol();
            if (s3 === peg$FAILED) {
              s3 = null;
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c2(s1, s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseSentence() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parseTokenSeq();
        if (s2 === peg$FAILED) {
          s2 = peg$parseQuotedTokenSeq();
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parseTokenSeq();
            if (s2 === peg$FAILED) {
              s2 = peg$parseQuotedTokenSeq();
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseEndOfSentence();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c3(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseTokenSeq() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$parseToken();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseWhitespace();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$currPos;
            s3 = peg$parseToken();
            if (s3 !== peg$FAILED) {
              s4 = peg$parseWhitespace();
              if (s4 !== peg$FAILED) {
                s3 = [s3, s4];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c4(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parseQuotedTokenSeq() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parseOpenSymbol();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parseToken();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseWhitespace();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$currPos;
              s4 = peg$parseToken();
              if (s4 !== peg$FAILED) {
                s5 = peg$parseWhitespace();
                if (s5 !== peg$FAILED) {
                  s4 = [s4, s5];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            }
          } else {
            s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parseEndOfSentence();
            if (s3 !== peg$FAILED) {
              s4 = peg$parseCloseSymbol();
              if (s4 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c5(s1, s2, s3, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseEndOfSentence() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        if (peg$c6.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c7);
          }
        }
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c6.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c7);
            }
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c8();
        }
        s0 = s1;
        return s0;
      }
      function peg$parseWhitespace() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        if (peg$c9.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c10);
          }
        }
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c9.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c10);
            }
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c8();
        }
        s0 = s1;
        return s0;
      }
      function peg$parseToken() {
        var s0, s1;
        s0 = peg$currPos;
        s1 = peg$parseURI();
        if (s1 === peg$FAILED) {
          s1 = peg$parseEmail();
          if (s1 === peg$FAILED) {
            s1 = peg$parseNumber();
            if (s1 === peg$FAILED) {
              s1 = peg$parseAbbreviation();
              if (s1 === peg$FAILED) {
                s1 = peg$parseWord();
              }
            }
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c11(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parseAbbreviation() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        if (peg$c12.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c13);
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c12.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c13);
              }
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = peg$currPos;
          s2 = peg$c14(s1);
          if (s2) {
            s2 = void 0;
          } else {
            s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c15(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseWord() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        if (peg$c16.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c17);
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c16.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c17);
              }
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c18();
        }
        s0 = s1;
        return s0;
      }
      function peg$parseNumber() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = [];
        if (peg$c19.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c20);
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c19.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c20);
              }
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos;
          if (input.length > peg$currPos) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c21);
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            if (peg$c19.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c20);
              }
            }
            if (s5 !== peg$FAILED) {
              while (s5 !== peg$FAILED) {
                s4.push(s5);
                if (peg$c19.test(input.charAt(peg$currPos))) {
                  s5 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c20);
                  }
                }
              }
            } else {
              s4 = peg$FAILED;
            }
            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parseCloseSymbol();
            if (s3 === peg$FAILED) {
              s3 = null;
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c8();
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseEmail() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        s1 = [];
        if (peg$c22.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c23);
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c22.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c23);
              }
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          if (peg$c24.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c25);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = [];
            if (peg$c22.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c23);
              }
            }
            if (s4 !== peg$FAILED) {
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                if (peg$c22.test(input.charAt(peg$currPos))) {
                  s4 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c23);
                  }
                }
              }
            } else {
              s3 = peg$FAILED;
            }
            if (s3 !== peg$FAILED) {
              if (peg$c26.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c27);
                }
              }
              if (s4 !== peg$FAILED) {
                s5 = [];
                if (peg$c22.test(input.charAt(peg$currPos))) {
                  s6 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c23);
                  }
                }
                if (s6 !== peg$FAILED) {
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    if (peg$c22.test(input.charAt(peg$currPos))) {
                      s6 = input.charAt(peg$currPos);
                      peg$currPos++;
                    } else {
                      s6 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c23);
                      }
                    }
                  }
                } else {
                  s5 = peg$FAILED;
                }
                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c8();
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseURI() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 7) === peg$c28) {
          s1 = peg$c28;
          peg$currPos += 7;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c29);
          }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 8) === peg$c30) {
            s1 = peg$c30;
            peg$currPos += 8;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c31);
            }
          }
        }
        if (s1 === peg$FAILED) {
          s1 = null;
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          if (peg$c32.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c33);
            }
          }
          if (s3 !== peg$FAILED) {
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              if (peg$c32.test(input.charAt(peg$currPos))) {
                s3 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c33);
                }
              }
            }
          } else {
            s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
            if (peg$c26.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c27);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$currPos;
              s5 = [];
              if (peg$c32.test(input.charAt(peg$currPos))) {
                s6 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c33);
                }
              }
              if (s6 !== peg$FAILED) {
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  if (peg$c32.test(input.charAt(peg$currPos))) {
                    s6 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c33);
                    }
                  }
                }
              } else {
                s5 = peg$FAILED;
              }
              if (s5 !== peg$FAILED) {
                if (peg$c26.test(input.charAt(peg$currPos))) {
                  s6 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c27);
                  }
                }
                if (s6 !== peg$FAILED) {
                  s5 = [s5, s6];
                  s4 = s5;
                } else {
                  peg$currPos = s4;
                  s4 = peg$FAILED;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
              if (s4 === peg$FAILED) {
                s4 = null;
              }
              if (s4 !== peg$FAILED) {
                s5 = [];
                if (peg$c32.test(input.charAt(peg$currPos))) {
                  s6 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c33);
                  }
                }
                if (s6 !== peg$FAILED) {
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    if (peg$c32.test(input.charAt(peg$currPos))) {
                      s6 = input.charAt(peg$currPos);
                      peg$currPos++;
                    } else {
                      s6 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c33);
                      }
                    }
                  }
                } else {
                  s5 = peg$FAILED;
                }
                if (s5 !== peg$FAILED) {
                  s6 = [];
                  s7 = peg$currPos;
                  s8 = [];
                  if (peg$c32.test(input.charAt(peg$currPos))) {
                    s9 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s9 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c33);
                    }
                  }
                  if (s9 !== peg$FAILED) {
                    while (s9 !== peg$FAILED) {
                      s8.push(s9);
                      if (peg$c32.test(input.charAt(peg$currPos))) {
                        s9 = input.charAt(peg$currPos);
                        peg$currPos++;
                      } else {
                        s9 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c33);
                        }
                      }
                    }
                  } else {
                    s8 = peg$FAILED;
                  }
                  if (s8 !== peg$FAILED) {
                    if (peg$c34.test(input.charAt(peg$currPos))) {
                      s9 = input.charAt(peg$currPos);
                      peg$currPos++;
                    } else {
                      s9 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c35);
                      }
                    }
                    if (s9 !== peg$FAILED) {
                      s8 = [s8, s9];
                      s7 = s8;
                    } else {
                      peg$currPos = s7;
                      s7 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s7;
                    s7 = peg$FAILED;
                  }
                  while (s7 !== peg$FAILED) {
                    s6.push(s7);
                    s7 = peg$currPos;
                    s8 = [];
                    if (peg$c32.test(input.charAt(peg$currPos))) {
                      s9 = input.charAt(peg$currPos);
                      peg$currPos++;
                    } else {
                      s9 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c33);
                      }
                    }
                    if (s9 !== peg$FAILED) {
                      while (s9 !== peg$FAILED) {
                        s8.push(s9);
                        if (peg$c32.test(input.charAt(peg$currPos))) {
                          s9 = input.charAt(peg$currPos);
                          peg$currPos++;
                        } else {
                          s9 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c33);
                          }
                        }
                      }
                    } else {
                      s8 = peg$FAILED;
                    }
                    if (s8 !== peg$FAILED) {
                      if (peg$c34.test(input.charAt(peg$currPos))) {
                        s9 = input.charAt(peg$currPos);
                        peg$currPos++;
                      } else {
                        s9 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c35);
                        }
                      }
                      if (s9 !== peg$FAILED) {
                        s8 = [s8, s9];
                        s7 = s8;
                      } else {
                        peg$currPos = s7;
                        s7 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s7;
                      s7 = peg$FAILED;
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c36();
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseOpenSymbol() {
        var s0, s1;
        s0 = peg$currPos;
        if (peg$c37.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c38);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c8();
        }
        s0 = s1;
        return s0;
      }
      function peg$parseCloseSymbol() {
        var s0, s1;
        s0 = peg$currPos;
        if (peg$c39.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c40);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c8();
        }
        s0 = s1;
        return s0;
      }
      const knownAbbreviations = require_abbreviations_en().knownAbbreviations;
      peg$result = peg$startRuleFunction();
      if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
      } else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
          peg$fail(peg$endExpectation());
        }
        throw peg$buildStructuredError(
          peg$maxFailExpected,
          peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
          peg$maxFailPos < input.length
            ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
            : peg$computeLocation(peg$maxFailPos, peg$maxFailPos),
        );
      }
    }
    module.exports = {
      SyntaxError: peg$SyntaxError,
      parse: peg$parse,
    };
  },
});

// lib/natural/tokenizers/tokenizer.js
var require_tokenizer = cjs({
  "lib/natural/tokenizers/tokenizer.js"(exports, module) {
    "use strict";
    var Tokenizer = class {
      trim(array) {
        while (array[array.length - 1] === "") {
          array.pop();
        }
        while (array[0] === "") {
          array.shift();
        }
        return array;
      }
    };
    module.exports = Tokenizer;
  },
});

// lib/natural/tokenizers/sentence_tokenizer_parser.js
var require_sentence_tokenizer_parser = cjs({
  "lib/natural/tokenizers/sentence_tokenizer_parser.js"(exports, module) {
    var parser = require_parser_sentence_tokenizer();
    var Tokenizer = require_tokenizer();
    var SentenceTokenizer = class extends Tokenizer {
      tokenize(text) {
        return parser.parse(text);
      }
    };
    module.exports = SentenceTokenizer;
  },
});
export default require_sentence_tokenizer_parser();
