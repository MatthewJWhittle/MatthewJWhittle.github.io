# Editorial direction for the personal website

**Approved November 2026.** This is the current public-content guidance. It takes precedence over older sample biographies and page structures in the design plan. It is not a substitute for asking the owner when facts or publication rights are uncertain.

## What this site is for

A semi-personal, semi-professional home: somewhere to point people towards work, share notes on projects, and give a credible sense of the person behind them. Career opportunities and collaboration are welcome outcomes, not the copy's organising principle.

The enduring story is someone who likes **building useful and interesting things**. Ecology and science are important roots. Software, data, machine learning, geospatial work and technical leadership are ways that interest has developed. Don't assign a narrow professional identity or optimise the whole site for the latest project, technology or conversation.

## Voice

- First person, friendly, conversational, quietly confident, occasionally playful. British English.
- Specific and plain. Say what the problem was, what was built, what you personally did and what you learnt.
- Be technically precise without writing an API manual. Link to documentation for the low-level implementation.
- Understatement is good; forced modesty, scripted anecdotes and self-conscious literary metaphors are not.
- Avoid corporate buzzwords, inflated impacts, buzzword skill lists, repeated abstractions, “passionate about”, “leveraging”, “unlocking”, “journey” and artificial “contract” metaphors.
- Do not turn tentative interpretations of someone's character or motivations into factual first-person assertions. Ask rather than invent.

Examples of more natural editing:

| Avoid | Prefer |
|---|---|
| “The data work was becoming mine.” | “I started taking on more of the data work alongside ecology projects.” |
| “The useful move was to give the job a contract.” | “I wanted to describe a service and get an array back.” |
| “I coached the GIS developers beside me into version control.” | “I helped the GIS development team adopt version control and testing.” |
| “The model gets the attention; the hard part was getting the pictures.” | “Getting the imagery into a usable form often took longer than expected.” |

## Current content boundaries

- Homepage sections: **About → Projects → Contact**. Career history lives on a shareable **`/cv/`** route, linked from the About introduction and the sticky nav — not as a full homepage section.
- Featured public projects: **tilearray** and **Modelling bat habitat suitability across Yorkshire**. Do not invent, publish or link unpublished research or client work. Don't revive unmaintained libraries to fill a quota.
- Experience timeline (on `/cv/`): show role, employer and a clear date label without opening it. Expansion should add substantive detail, not repeat the summary. Use verified career information and distinguish leadership, technical contributions and involvement in colleagues' work.
- Project articles can be substantial case studies or informal notes. Their shape should follow the material, not a rigid template. Useful sequence: practical problem → personal contribution → what exists → important trade-off → limits/learning → links.
- Only use assets and claims approved for public release. A public code repository is evidence that code is visible, not automatic permission to publish related client data or confidential outcomes.
- **Draft flags do not make Git files private.** Do not place commercially sensitive or otherwise private material in this public repository, even as a draft or in a comment.

## Editorial acceptance checks

Before claiming a pass is finished:

1. Read the **rendered** About, the `/cv/` experience summaries/details and every published project article — not merely the changed lines.
2. Check for phrases called out in previous reviews. If a phrase is marked for replacement, show the exact new text or explicitly explain why you kept it.
3. Check for duplication: a collapsed timeline summary and its expanded text should give different value; the first two paragraphs of a case study should not say the same thing twice.
4. Check the subject's contribution against verified information. Distinguish what was built from intended future work, a prototype from a maintained product, and model suitability from observed species presence.
5. Confirm every external link, date and project status. **A project start date is not a blog post date.** Flag uncertainty instead of inventing precision.
6. Verify only explicitly approved projects are surfaced and that unapproved material is not introduced into the public source tree.
7. Run the build and review a desktop and mobile preview. Report separately what was technically checked and what was editorially reviewed.
8. Ask for owner sign-off on identity-defining copy, disputed facts and public release; never merge based solely on a coding agent's “done” message.

If the request is to implement an approved wording change, implement it literally. Coding agents should not interpret the owner's personality from scratch or rewrite more than the agreed material.
