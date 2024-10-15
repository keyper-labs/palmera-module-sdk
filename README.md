# Palmera

[![npm Version](https://badge.fury.io/js/%40keyper-labs%2Fpalmera-module-sdk.svg)](https://badge.fury.io/js/%40keyper-labs%2Fpalmera-module-sdk)
[![GitHub Release](https://img.shields.io/github/release/keyper-labs/palmera-module-sdk.svg?style=flat)](https://github.com/keyper-labs/palmera-module-sdk/releases)
[![GitHub](https://img.shields.io/github/license/keyper-labs/palmera-module-sdk)](https://github.com/keyper-labs/palmera-module-sdk/blob/main/LICENSE.md)

Software development kit that facilitates the interaction with [Palmera Module](https://docs.palmeradao.xyz/palmera-module-safe-hierarchical-structure) using a TypeScript interface. This Kit can be used to create on chain organizations, create and execute transactions on behalf, and much more.

## Table of contents

- [Documentation](#documentation)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Need Help or Have Questions?](#need-help-or-have-questions)
- [License](#license)

## Documentation

Head to the [Palmera SDK docs](https://github.com/keyper-labs/palmera-module-sdk/blob/main/Palmera.md) to learn more about this SDK.

## Installation

Install the package with yarn or npm:

```bash
yarn add @keyper-labs/palmera-module-sdk
npm install @keyper-labs/palmera-module-sdk
```

## Quick Start

### 1. Create a Palmera instance

There are two ways to create a Palmera instance.

#### a. Initialize with an existing Safe intance

Using an existing Safe instance, you can initialize a Palmera SDK instance.

```js
import Safe from '@safe-global/protocol-kit'
import Palmera from '@keyper-labs/palmera-module-sdk'

const protocolKit = await Safe.create({
  ethAdapter,
  safeAddress,
})

const palmeraSdk = await Palmera.init(protocolKit)
```

#### b. Create using a SafeConfig

Using an ethAdapter and a Safe address, the Palmera SDK will create a Safe instance internally and return a new Palmera instance.

```js
import Palmera from '@keyper-labs/palmera-module-sdk'

const palmeraSdk = await Palmera.create({
  ethAdapter,
  safeAddress,
})
```

### 2. Prepare your Safe

You need to enable Palmera module and set Palmera Guard in order to create a new organization in Palmera

```js
const tx = await palmeraSDK.setUpSafeTx()
const result = await safeSDK.executeTransaction(tx)
```

### 3. Create your first organization

Create and execute a Safe transaction to register your new organization. This requires an organization name, which can be something that describes your organization or a random name.

```js
const tx = await palmeraSDK.registerOrganizationTx('Some name')
const result = await safeSDK.executeTransaction(tx)
```

Let's confirm your first organization and retrieve the org hash from the Safe address.

```js
const isRegistered = await palmeraSDK.isOrganizationRegistered()
const orgHash = await palmeraSdk.getOrgHashBySafe(safeAddress)
```

## Need Help or Have Questions? (WIP)

If you have any doubts, questions, or need assistance, feel free to reach out! [Here you will find how to get support.](https://t.me/palmera_support)

## License

This library is [released under MIT](https://github.com/keyper-labs/palmera-module-sdk/blob/main/LICENSE.md).
