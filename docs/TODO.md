# Book Ideas / Notes

Running list of content ideas to revisit during chapter generation. This file
is excluded from the build (see `exclude_docs` in `mkdocs.yml`), so it's safe
to use as a scratchpad that won't leak into search or the sitemap.

## Worked example: real litigation matter graph

Idea from 2026-07-18: build a worked knowledge-graph example using a
litigation that's been in the public eye, constructed only from publicly
available information (court filings, news coverage, docket entries) —
rather than a synthetic/toy dataset.

- Natural home: the "Legal and enterprise knowledge graphs" chapter (course
  description topic 12), possibly extended into the Capstone chapter
  (topic 14) as a fully worked example students can follow end-to-end.
- Touches existing concepts: `Matter Graph` (#179), `Case Law Graph` (#184),
  `Contract Graph` (#185), `Citation Network` (#173), `Legal Entity
  Resolution` (#183), `Expertise Location` (#181), `Conflicts Checking`
  (#182).
- Open questions to resolve when we get there: which case to use (needs to
  be well-documented publicly, not under seal, and not raise privacy/
  sensitivity concerns), what the node/edge schema looks like (parties,
  counsel, filings, judges, claims, precedents cited), and whether it
  becomes a static diagram, a MicroSim (vis-network graph viewer), or both.
- Revisit during `book-chapter-generator` (chapter structure) and
  `chapter-content-generator` (actual worked example content).

## Real-world legal ontologies: SALI and FOLIO

Idea from 2026-07-18: bring in two real, industry-adopted legal ontologies as
concrete examples, rather than only illustrating ontologies with toy/abstract
cases.

- **SALI** — the Standards Advancement for the Legal Industry Alliance
  (sali.org). Its ontology contains 10,000+ tags describing both substantive
  law and the business of law, largely developed by Damien Riehl.
- **FOLIO** — the Federated Open Legal Information Ontology, an open-source
  outgrowth of SALI's ontology, maintained by Michael Bommarito and the ALEA
  Institute. CC-BY licensed, 18,000+ standardized legal concepts, each with a
  unique IRI and multilingual labels. Source: [github.com/alea-institute/FOLIO](https://github.com/alea-institute/FOLIO).
- Natural home: the "From taxonomies to ontologies" chapter (topic 2) and/or
  "Semantic web standards" chapter (topic 5) — FOLIO is a real OWL/RDF
  ontology, so it's a good worked example for `Ontology` (#36), `Domain
  Ontology` (#41), `OWL` (#71), and `Legal Taxonomy` (#187). Could also
  anchor part of the litigation matter-graph worked example above (e.g.,
  tagging matter types or practice areas using FOLIO's taxonomy).
- Open questions: confirm current license/access terms before using FOLIO
  data directly in chapter content or a MicroSim; check whether SALI's own
  ontology is separately licensed for reuse or only available to members.
- Revisit during `chapter-content-generator` for chapters 2 and 5, and when
  building the litigation matter-graph worked example.

## Community source for examples: skills.law

Idea from 2026-07-18: skills.law is SKILLS, the Strategic Knowledge &
Innovation Legal Leaders' Summit (founded 2003, hosted by Oz Benamram) — a
community/event series (Summit, public Showcase, educational programming) for
legal knowledge management, innovation, AI/data, and legal-ops leaders at law
firms.

- Not an ontology like SALI/FOLIO — it's a practitioner community and content
  source. Potential value: real-world case studies, speaker talks, or
  examples of legal knowledge graphs / KM systems in production that could
  ground chapter content or the case-studies chapter (topic 11) and the
  legal/enterprise KG chapter (topic 12).
- Open questions: check what content is public vs. summit-attendee-only
  before citing or reusing anything specific.
- Revisit during `chapter-content-generator` for chapters 11 and 12, and
  during `reference-generator` as a potential source for further reading.
