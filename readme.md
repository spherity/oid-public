# Organisational Identity - EU Company Certificate Vocabulary

## Abstract

This project defines the vocabulary to describe the credential subjects of the EU company certificate (EUCC). The credential subjects defined by this vocabulary are legal persons (`LegalPerson`) and natural persons (`NaturalPerson`) according to the definitions of the [Regulation (EU) 2024/1183 - European Digital Identity Framework](https://eur-lex.europa.eu/eli/reg/2024/1183) with the limitation that the `NaturalPersonal` described by the EUCC Vocabulary only contains claims about natural persons which act in the context of a `LegalPerson` and are only asserted for this scope. Consequently, the corresponding verifiable credentials are not issued by a PID-provider according to [PID rule book - ARF-Annex 3.1](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/blob/v1.4.0/docs/annexes/annex-3/annex-3.01-pid-rulebook.md). Instead, they are intended to be issued by a business register (authentic source) as part of the EUCC.

## Status

Draft

## Content

```
├── docs
│   └── contexts
│       └── eucc
│           ├── credentials     // examples
│           ├── v1.jsonld       // json ld context - https://oid.spherity.com/contexts/eucc/v1
│           └── vocabulary.md   // vocabulary specification - https://oid.spherity.com/eucc
└── readme.md
```