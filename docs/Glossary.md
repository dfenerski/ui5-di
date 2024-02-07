# Glossary

_dependency class_ - The class which gets annotated & registered with an injection token as potential dependency instance provider

_dependency proxy_ - Virtual proxy (for 'late binding'?) 'made available' at runtime to be used as dummy value instead of a dependency instance

_dependency instance_ - Instance of some dependency class instantiated & 'made available' at runtime

_dependency_ - Either a dependency proxy or a dependency instance

_dependency annotation_ - Constructor argument of specific dependency class type. Can be optionally annotated with a primitive token to override the inferred class injection token.

_dependency settlement_ - Explicit function call to the Injector requesting the dependency for the provided injection token

_dependency registration_ - Adding a dependency wraplet to the DI container

_dependency resolution manager_ - The class that does the resolving

_dependency resolution strategy_ - The 'scope' of the dependency; The degree of polymorphism?

_injection token_ - String, symbol or class definition which identifies a certain dependency

_primitive token_ or _primitive injection token_ - String or symbol which identifies a certain dependency

_dependency wraplet_ - Entry of the DI container, holding references to both the dependency proxy & dependency instance, as well as containing various additional informational properties for them. Wraplet - minimal wrapper
