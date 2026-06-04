---
title: People
date: 2026-01-01

type: landing

sections:
  - block: people
    content:
      title: Meet the team
      # Each person is an author profile under content/authors/<name>/ whose
      # `user_groups` lists one of the groups below. Add members by copying the
      # admin folder, renaming it, and setting their user_groups.
      user_groups:
        - Principal Investigators
        - Lab Members
        - Alumni
      sort_by: Params.last_name
      sort_ascending: true
    design:
      show_interests: false
      show_role: true
      show_social: true

  - block: markdown
    content:
      title: Join the lab
      text: |
        The Mattioli Lab is **newly opening and recruiting at all levels** — postdocs, graduate students, and undergraduates. We are building an interdisciplinary, supportive team spanning wet-lab and computational work. If our research excites you, please reach out with a short note about your interests and a CV.

        {{% cta cta_link="../contact/" cta_text="Get in touch →" %}}
    design:
      columns: '1'
---
