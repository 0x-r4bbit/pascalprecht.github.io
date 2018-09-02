+++
date = 2018-07-11T09:00:20+02:00
title = "On future-proof cryptographic hashes"
slug = "future-proofed-hashes-with-multihash"
tags = []
categories = ['cryptography']
+++

Let's talk about hashes.


As mentioned in the resurrecting [post about starting new]({{< ref "a-new-start.md" >}}), I'd like to document my learnings as I'm diving into projects that catch my attention in the decentralization space, such as [IPFS](https://ipfs.io 'IPFS website'). If you aren't familiar with IPFS or haven't heard of it, it's basically a stack of (networking) protocols that enables a fully distributed file storage system to creates a faster, safer and more reliable web.

Hashes play a big role in IPFS as they are used to address content in a distributed network, similar to how [Git](https://git-scm.com 'Git website') uses hashes to address commits, trees and binary objects inside a repository (yep, you probably use them on a daily basis, without noticing).

When a system relies on cryptographic hashes as fundamental building blocks, it's pretty important to have an update strategy in mind in case the hash algorithms used are considered weak or insecure at some point. In this post I'd like to explore **how the IPFS project takes advantage of "Multihashes"** to ensure hashes are upgradable and can co-exist in the same application.

### So... what are hashes again?

Right, let's get this out of our way quickly. A hash is actually less scary than it sounds. It is really just a function that takes some arbitrary input and returns a fixed-size alphanumeric string. What that alphanumeric string looks like depends on the given hash algorithm.

Let's make up a simple hash function and say we have a message "abc" which is our input. Our custom hash function's algorithm takes every character of the input message and moves it forward three letters in the alphabet. This will result in a hash digest "def".

```
HASH('abc') // 'def'
```

There it is. A hash.

Now, if we look at some real world hash functions, they do exactly the same thing (just that the algorithm is more complex obviously). Git for example uses SHA-1, which produces a 160 bit hash, [usually rendered as a hexadecimal number](https://crypto.stackexchange.com/questions/34995/why-do-we-use-hex-output-for-hash-functions 'Why do we use hex output for hash functions?'), 40 digits long. It hashes raw content (binary data), tree objects and commits.

If you have Git installed on your machine, try it yourself! Simply run the following command:

```
$ echo "abc" | git hash-object --stdin
```

The returned digest is `8baef1b4abc478178b004d62031cf7fe6db6f903`. And yes, a hash algorithm will always return the same hash for a given input. That's how you can verify integrity when you receive data from a sender. However, it is impossible to derive the input from a hash. Super important characteristic.

To be accurate here, it turns out that Git doesn't actually hash the raw input, but prepends the input with `blob ` followed by the size of the content before hashing. This isn't important right now, but just in case you're trying to verify the digest with e.g. OpenSSL's SHA-1 implementation, you'll notice it'll return a different hash from 'abc'.

Also, if you **do** want to dig deeper (like me), check out [this StackOverflow answer](https://stackoverflow.com/questions/552659/how-to-assign-a-git-sha1s-to-a-file-without-git/552725#552725 'How Git calculates the SHA1 for a file').

The bottom line is:

- Hashes are the result of an algorithm transforming an input to a digest
- Algorithms return a fixed length (e.g. SHA1 returns 160 bit hashes)
- They always return the same hash value for a given input
- It is (or should be) impossible to derive the input from a hash

Okay, coming back to this "Multihashes" thing...

### The problem with hashes

Hashes are really great. Due to their characteristics, we can use them to verify the integrity of content and data, plus, they can be very compact as well. Unfortunately though, sometimes they turn out to be not secure or strong enough (I'm looking at you, [MD5](https://en.wikipedia.org/wiki/MD5 'MD5 on Wikipedia)!), or attackers manage to break them. Not something that happens all the time, but it happened.

Imagine a simple, but common scenario in which user passwords are stored in some database. Obviously, we don't want to store passwords in plain text, that'd be a disaster for many different reasons I don't think I have to mention here. Perfect use case for hashes right? So let's go ahead and assume we store those passwords as MD5 hashes. Wonderful, many problems solved with a simple fix.

Now let's say, *cough* hypothetically *cough* 🙃, the next day, [MD5 is considered insecure](https://security.stackexchange.com/questions/19906/is-md5-considered-insecure 'Is MD5 considered insecure?'). What are are going to do? Well, we definitely have to upgrade our hash algorithm to something more secure. That turns out to be a challenge though, because we happen to deal with a large, maybe distributed, system and can only upgrade over time.

We need to find a way to slowly (but as fast as possible) upgrade to a different hash algorithm, while keeping the existing system in tact.

Another problem that shouldn't get less attention, is that existing systems often rely on APIs that simply assume a certain type of hash and its length. Think about how many Git repositories are out there with every single object being a 160 bit hexadecimal hash (40 digits). Imagine what happens when Git switches to SHA-2, a 256 bit hash and how many tools and applications would break.

Turns out problems like those can be avoid by introducing a versioning system.

### Versioned hashes

The idea is quite simple: introduce some version as part of the hash so the system can easily figure out what hash it is dealing with.

Let's take the 'abc' hash we calculated with Git earlier:

```
8baef1b4abc478178b004d62031cf7fe6db6f903
```

If this is a password hash and we'd have to verify whether it is the correct password or not, we'd just compare this computed hash with the one in our database. However, as mentioned earlier, we want to migrate to a different hash algorithm without breaking the system. The same input as SHA-256 for example, looks quite different:

```
BA7816BF8F01CFEA414140DE5DAE2223B00361A396177A9CB410FF61F20015AD
```

In order to know up front that we're in fact dealing with a different hash version, we ca introduce a version number like this:

```
1:BA7816BF8F01CFEA414140DE5DAE2223B00361A396177A9CB410FF61F20015AD
```
This also works great for systems that already use *unversioned* hashes. Any hash without a colon must have been created before the version change. Any hash with a colon and version number can be handled in a respective way (stripping out the first two bytes (`1:`) and assume the hash is a SHA-256 hash in this case).

This solution can be scaled up and down in different ways depending on our needs. For example, if we're in a scenario where we happen to deal with more than two hash types, we could introduce versions for each type like this:

```
sha1:0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33
sha256:2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae
blake2:a96953281f3fd944a3206219fad61a40b992611b7580f1fa091935db3f7ca13d
```

In fact, this seems to be [the way to go](https://stackoverflow.com/questions/3955223/password-hashing-how-to-upgrade).

We can do better though. While the above is a decent way to approach this challenge, there are still some things can turn into problems:

- One obvious characteristic is that the version type might not be compatible with the rest of the hash type. For example `s` is not a valid hexadecimal digit. However, Most systems transfer hashes in hex (or base32, base64 etc). So there's added complexity when building apps on top of those schemes.
- In case millions or billions of hashes have to be stored, long version types like `blake2` might have a considerable impact in terms of byte costs. A shorter streamlined version syntax may be better here.

Okay, now it's really time to dive into this Multihash thing.

### Multihashes

This is where Multihashes come into play. [Multihash](https://multiformats.io/multihash/ 'Multihash website') is a protocol (used by IPFS) for differentiating outputs from various well-established hash functions. It works very similar to what we've just done, just that it adds a little bit of extra information in a smart way.

A Multihash has the following pattern:

```
<hash-func-type><digest-length><digest-value>
```

Where

- the `<hash-func-type>` describes the hash function used - there's a [hash table](https://github.com/multiformats/multihash/blob/master/hashtable.csv 'Multihash table') to see how the codes are mapped
- the `<digest-length>` describes the length of the `<digest-value>` in bytes
- the `<digest-value>` is the actual hash value we're interested in

Okay, let's take the following Multihash as an example and try to demystify it

```
122041dd7b6443542e75701aa98a0c235951a28a0d851b11564d20022ab11d2589a8
```

**Notice**: In hexadecimal code, two digits are equal to one byte. In other words, the first two digits, `12`, can be translated to `0001 0010`. That's why a 160 bit hash in hex code is a 40 digit number. Also, usually hex codes are prepended with `0x` to indicate that it's a hex code. In this case `0x12` and `12` are the same thing.

We've learned that the first byte identifies the hash function type. According to the [Multihash table](https://github.com/multiformats/multihash/blob/master/hashtable.csv 'Multihash table'), that would be `sha2-256` (take a look yourself, it's in the seventh row).

Next up, the digest length (also in bytes). `0x20` is `32` in decimal, so at this point we already know the following hash value is 32 bytes (256 bits) long.

This is an important information to have. Remember the scenario where Git would switch from SHA-1 to SHA-256 ? Many apps and systems that work with Git hashes expect them to be 160 bit long. If Git used something like Multihash, apps could simply read out the length of the expected hash and keep it therefore variable.

Last but not least, the actual hash digest we're dealing with `41dd7b6443542e75701aa98a0c235951a28a0d851b11564d20022ab11d2589a8`.

Pretty cool, we basically have a single hash that is **completely self-describing** and still addressable as it keeps the characteristics of any other cryptographic hash.

Using the Multihash protocol these days is very easy as well. There are [implementations for several languages](https://multiformats.io/multihash/#implementations 'Multihash implementations') like Go, Java, Rust, JavaScript and more! If you want to learn about Multihashes and the IPFS protocol stack (yes, there's so much more), here are some resources:

- [RFC: Future-proofed cryptographic hash values by Juan Benet](https://github.com/jbenet/random-ideas/issues/1 'Initial RFC for Multihash')
- [Talk: Enter the Merkle Forest by Juan Benet](https://www.youtube.com/watch?v=Bqs_LzBjQyk 'Talk about IPLD')
- [Multihash Website](https://multiformats.io/multihash/ 'Multihash website')

Happy multihashing!
