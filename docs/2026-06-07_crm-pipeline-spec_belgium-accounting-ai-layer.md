# CRM Pipeline Spec — Belgium Accounting AI Layer

_Date: 2026-06-07_

## Purpose
This document translates the ICP, prospecting, cadence, and pricing source docs into a practical CRM operating spec for the Belgium Accounting AI Layer.

It is designed for a **premium design-partner motion**, not high-volume lead gen.

Grounding constraints:
- this spec does **not** claim live prospect research was completed
- this spec does **not** invent accounting firms, contacts, or market facts
- this spec is a process and data model for future sourcing and outreach

---

## 1. Operating assumptions from source docs

### ICP assumptions
- target firms are Belgian accounting / bookkeeping firms
- ideal team size: **10–80 employees**
- sweet spot: **15–40 employees**
- focus on recurring SME dossiers
- first wedge is **AI control / review / close / reporting layer**
- this is **not** a core accounting software replacement

### Sales-motion assumptions
- start with a curated list, not bulk outreach
- prioritize operational pain over generic AI interest
- aim for a defined **30–50 dossier pilot**
- require a plausible sponsor and a usable pilot scope

### Commercial assumptions
- pilot must be sold as a serious operational initiative
- indicative pilot anchor from pricing doc:
  - setup: **€15,000**
  - monthly: **€5,500**
  - minimum: **3 months**
- price objections should be handled against pilot scope and value, not by default discounting

---

## 2. CRM object model

Track work at two levels.

### Account level
Use one account record per target firm.

Required core fields:
- target_id
- firm_name
- website
- country
- region
- language_preference
- tier
- segment
- team_size_band
- office_count_band
- firm_type
- sme_focus
- suspected_stack_signals
- suspected_operational_pain_signals
- icp_score_total
- score_band
- account_owner
- crm_stage
- outreach_status
- qualification_status
- next_step
- next_step_due_date
- stop_reason

### Contact level
Use 1–2 active contacts per firm in the first wave.

Required core fields:
- contact_full_name
- first_name
- last_name
- title
- role_type
- seniority
- email
- linkedin_url
- phone
- whatsapp_or_telegram_available
- primary_contact
- relationship_status
- sponsor_likelihood
- champion_likelihood

---

## 3. ICP scoring model in CRM
Use the documented **0–2 per criterion** scoring model.

### Score axes
- process_discipline_score
- pain_intensity_score
- stack_fragmentation_score
- sponsor_likelihood_score
- pilot_scope_fit_score
- implementation_speed_score
- human_in_loop_fit_score
- no_core_replacement_fit_score

### Total score bands
- **13–16**: Tier A priority
- **9–12**: Tier B priority
- **0–8**: Tier C or disqualify

### Practical rule
Do not treat the score as fake precision.
Use it for ordering work, messaging priority, and deciding where personalization time goes first.

---

## 4. Pipeline stages
The CRM pipeline should be account-centric, with contact activity nested under the account.

### Stage 0 — List Candidate
Definition:
- row created as part of targetlist build
- no outreach yet
- company may still be unverified

Entry criteria:
- target_id assigned
- account row created

Exit criteria:
- minimum research fields completed, or record disqualified immediately

Required fields before exit:
- target_id
- firm_name or placeholder blank if not yet researched
- tier
- segment
- owner
- initial research status

### Stage 1 — Research Complete
Definition:
- enough information exists to decide whether outreach is justified

Entry criteria:
- core firmographic and pain hypothesis fields completed

Exit criteria:
- move to Outbound Ready, Nurture, or No Fit

Required fields before exit:
- website
- language_preference if known
- team_size_band
- firm_type
- sme_focus
- suspected_stack_signals
- suspected_operational_pain_signals
- icp_score_total
- score_band
- at least 1 target contact or explicit note why unavailable

### Stage 2 — Outbound Ready
Definition:
- account selected for the 4-week cadence

Entry criteria:
- account owner assigned
- primary contact identified
- personalization notes written

Exit criteria:
- first touch sent

Required fields before exit:
- account_owner
- primary_contact
- personalization_note_1
- personalization_note_2
- next_step
- next_step_due_date

### Stage 3 — Active Cadence
Definition:
- prospect is in the live outbound sequence

Entry criteria:
- first touch sent through at least one channel

Exit criteria:
- reply received, cadence completed without reply, or stop condition hit

Tracked fields:
- first_touch_date
- last_touch_date
- last_touch_channel
- touch_count_total
- cadence_step_current
- email_1_date
- linkedin_touch_1_date
- email_2_date
- linkedin_touch_2_date
- mobile_touch_date
- email_3_date
- final_followup_date
- reply_received
- reply_type

### Stage 4 — Engaged / Reply Received
Definition:
- a human response has arrived

Entry criteria:
- positive, neutral, referral, out-of-office, or negative reply logged

Exit criteria:
- routed to discovery, nurture, wrong contact handling, or closed

Required fields before exit:
- reply_type
- reply_summary
- response_date
- next_step
- next_step_due_date

### Stage 5 — Discovery Qualified
Definition:
- account appears relevant enough for a qualification call

Entry criteria:
- positive or neutral engagement
- fit appears plausible

Exit criteria:
- pilot evaluation, nurture, or no fit

Required qualification fields:
- sponsor_present
- pilot_scope_30_50_dossiers
- stack_fragmentation_level
- review_close_pain_level
- expected_implementation_speed
- data_access_openness
- current_review_process_summary
- current_mail_document_flow_summary
- top_pain_points
- discovery_call_scheduled

### Stage 6 — Pilot Evaluation
Definition:
- account is being assessed for a serious design-partner pilot

Entry criteria:
- real discovery happened
- buyer/champion and pilot scope are discussable

Exit criteria:
- proposal, nurture, or no fit

Required fields before exit:
- buyer_identified
- champion_identified
- pilot_scope_summary
- pilot_team_scope
- pilot_data_sources_scope
- budget_fit_estimate
- timing_fit_estimate
- risk_flags
- disqualification_flags

### Stage 7 — Proposal / Commercial
Definition:
- pricing and scope are actively under discussion

Entry criteria:
- credible pilot fit established
- commercial conversation warranted

Exit criteria:
- verbal alignment, closed won, closed lost, or nurture

Required fields before exit:
- proposed_setup_fee
- proposed_monthly_fee
- proposed_term_months
- discount_requested
- discount_logic_notes
- commercial_objections
- decision_process_notes
- target_decision_date

### Stage 8 — Design Partner Won
Definition:
- pilot agreed and moved into onboarding handoff

Track:
- signed_date
- contracted_setup_fee
- contracted_monthly_fee
- pilot_start_target
- onboarding_owner

### Stage 9 — Nurture
Definition:
- potentially relevant account, but not ready now

Common reasons:
- timing not now
- sponsor not ready
- quarter/year-end pressure
- wrong contact but interesting account

Required fields:
- nurture_reason
- nurture_revisit_date
- nurture_notes

### Stage 10 — Closed Lost / No Fit
Definition:
- account should not be actively pursued for now

Common reasons aligned to source docs:
- no response after full cadence
- no fit ICP
- do not contact
- wrong timing
- wrong contact routed and no path forward
- expects core replacement
- no clear sponsor
- cannot define 30–50 dossier pilot
- price/pilot scope objection
- no operational priority

Required fields:
- close_date
- stop_reason
- close_notes

---

## 5. Stage gates and SLAs

### Research SLA
- Tier A: research completed before any sequence starts
- Tier A: at least **2 personalization notes** required
- Tier B/C: lighter research acceptable, but no generic spam

### Reply SLA
- positive or neutral reply: respond within **24 hours**
- referral or wrong contact: reroute within **48 hours**
- out-of-office: reschedule according to return date

### Cadence SLA
Use the 4-week cadence from the source doc:
- week 1: Email 1 + LinkedIn recognition
- week 2: Email 2 + LinkedIn follow-up
- week 3: WhatsApp/Telegram only if appropriate, otherwise substitute email/LinkedIn bump + Email 3
- week 4: final follow-up + optional last LinkedIn nudge if engagement existed
- day 28: force a CRM status decision

### Stop SLA
Stop active outbound immediately when:
- prospect says no interest
- prospect asks not to be contacted
- clear no-fit against multiple ICP dimensions
- clear expectation mismatch around core replacement

---

## 6. Cadence tracking fields
Use explicit fields so the sequence is auditable.

Recommended columns:
- cadence_status
- cadence_step_current
- cadence_week
- first_touch_date
- last_touch_date
- last_touch_channel
- touch_count_total
- email_1_date
- linkedin_touch_1_date
- email_2_date
- linkedin_touch_2_date
- mobile_touch_date
- email_3_date
- final_followup_date
- linkedin_final_nudge_date
- reply_received
- reply_type
- reply_date
- meeting_booked
- meeting_date

Allowed reply_type values:
- positive
- neutral
- negative
- referral
- out_of_office

Allowed outreach_status values:
- not_started
- in_research
- ready
- active_cadence
- engaged
- nurture
- closed

---

## 7. Qualification rules

### Promote to Discovery Qualified when most are true
- pain is recognizable
- sponsor exists or is plausible
- 30–50 dossier pilot is discussable
- existing stack should remain in place
- human-in-the-loop and auditability are acceptable

### Keep in Nurture when
- pain exists but timing is bad
- correct stakeholder not yet reached
- account is interesting but sponsor maturity is low

### Disqualify when 2 or more heavy red flags exist
Heavy red flags from source docs:
- only price-shopping
- wants full autonomous accounting immediately
- wants core replacement rather than an AI layer
- no internal owner
- no pilot scope possible
- no limited data access possible
- very procurement-heavy for first design-partner phase
- extreme process immaturity

---

## 8. Commercial guidance fields
To keep pricing conversations grounded, add these CRM fields:
- pricing_anchor_band
- proposed_setup_fee
- proposed_monthly_fee
- proposed_term_months
- setup_credit_discussed
- discount_percent
- discount_reason
- strategic_value_notes
- procurement_complexity
- referenceability_potential

Recommended defaults for qualified pilot opportunities:
- pricing_anchor_band: `standard_icp_anchor`
- proposed_setup_fee: `15000`
- proposed_monthly_fee: `5500`
- proposed_term_months: `3`

These are **commercial defaults**, not commitments.
They should only be used once a prospect reaches real pilot evaluation.

---

## 9. Minimum dashboards / views

### View 1 — Tier A active accounts
Filter:
- tier = A
- crm_stage in Outbound Ready, Active Cadence, Engaged, Discovery Qualified

### View 2 — Replies needing response
Filter:
- reply_received = yes
- next_step_due_date today or overdue

### View 3 — Discovery pipeline
Filter:
- crm_stage in Discovery Qualified, Pilot Evaluation, Proposal / Commercial

### View 4 — Nurture queue
Filter:
- crm_stage = Nurture
- sort by nurture_revisit_date ascending

### View 5 — Closed-lost reasons
Purpose:
- learn whether objections cluster around timing, price, sponsor absence, or no-fit

---

## 10. KPI layer for the CRM
Track only simple, decision-useful metrics initially.

### List quality
- total target firms
- % Tier A / B / C
- % records with complete core fields
- % firms with at least 1 valid buyer contact
- % firms with 2 relevant stakeholders

### Activity
- first touches sent
- sequences started
- firms completed through full cadence
- average touches per firm

### Engagement
- overall reply rate
- positive reply rate
- LinkedIn connect accept rate
- referral rate

### Qualification
- discovery rate by tier
- % with plausible pilot fit
- % disqualified on sponsor / scope / data openness

### Pipeline output
- discovery calls booked
- pilot evaluation conversations
- proposal-stage accounts
- design partner wins

---

## 11. Recommended folder / file usage
- docs/: human-readable process specs and strategy docs
- crm/templates/: reusable CSV schema templates
- crm/targetlists/: date-stamped working targetlists

---

## 12. Hard rules for this project
- no invented prospect names
- no invented contact data
- no fabricated firm pain claims
- no pretending research was completed if fields are still blank
- if a field is unknown, leave it blank or mark `unknown`
- if a channel is not appropriate, do not force it

---

## 13. Practical next action after this spec
1. fill the first 20 Tier A rows first
2. add 1 primary buyer and 1 secondary stakeholder per account where possible
3. write 2 personalization notes per Tier A account
4. run the 4-week cadence
5. review score bands, objections, and persona response rates after the first 10–15 outcomes
